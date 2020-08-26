import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth, isSeller } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller ? { seller: req.query.seller } : {};
    const orders = await Order.find({ ...seller })
      .populate('user', 'name')
      .populate('seller', 'name');
    res.send(orders);
  })
);
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id }).populate(
      'user',
      'name email'
    );
    if (order) {
      res.send(order);
    } else {
      res.status(404).send('Order Not Found.');
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isSeller,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send('Order Not Found.');
    }
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (!req.body.orderItems.length) {
      res.status(400).send({ message: 'Cart is empty' });
    }
    if (
      !req.body.orderItems
        .map((item) => item.seller)
        .every((val) => val === req.body.orderItems[0].seller)
    ) {
      res.status(400).send({
        message: 'Multi Seller Error. Buy from one seller at a time.',
      });
    }
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      seller: req.body.orderItems[0].seller,
      user: req.user._id,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res
      .status(201)
      .send({ message: 'New Order Created', data: newOrderCreated });
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid.', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order not found.' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered.', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order not found.' });
    }
  })
);

export default orderRouter;
