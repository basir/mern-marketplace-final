import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { getToken, isAuth, isAdmin } from '../utils.js';
import data from '../data.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const users = await User.insertMany(data.users);
    const seller1 = users[0]._id;
    const seller2 = users[1]._id;
    const sampleProducts = data.products.map((product, index) =>
      index < 3
        ? { ...product, seller: seller1 }
        : { ...product, seller: seller2 }
    );
    const products = await Product.insertMany(sampleProducts);
    res.send({ users, products });
  })
);

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.put(
  '/profile/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.image = req.body.image || user.image;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      if (user.isSeller) {
        user.seller.name = req.body.seller.name;
        user.seller.logo = req.body.seller.logo;
        user.seller.description = req.body.seller.description;
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        token: getToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const signedinUser = await User.findOne({
      email: req.body.email,
    });
    if (
      signedinUser &&
      bcrypt.compareSync(req.body.password, signedinUser.password)
    ) {
      res.send({
        _id: signedinUser._id,
        name: signedinUser.name,
        email: signedinUser.email,
        image: signedinUser.image,
        isAdmin: signedinUser.isAdmin,
        isSeller: signedinUser.isSeller,
        token: getToken(signedinUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User or Password!' });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isSeller: newUser.isSeller,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  })
);

/* admin */

userRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found.' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.isAdmin = req.body.isAdmin;
      user.isSeller = req.body.isSeller;
      const updatedUser = await user.save();
      if (updatedUser) {
        return res
          .status(200)
          .send({ message: 'User Updated', data: updatedUser });
      }
    }
    return res.status(500).send({ message: ' Error in Updating User.' });
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deletedUser = await User.findById(req.params.id);
    if (deletedUser) {
      await deletedUser.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  })
);

export default userRouter;
