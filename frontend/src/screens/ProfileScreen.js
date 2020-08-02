import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { updateUserProfile, detailsUser } from '../actions/userActions';
import { listOrderMine } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function ProfileScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  if (!userSignin.userInfo) {
    props.history.push('/signin');
  }
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, user, error } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert('Password and confirm password does not match.');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          email,
          name,
          password,
          seller: user.isSeller
            ? {
                logo: sellerLogo,
                name: sellerName,
                description: sellerDescription,
              }
            : {},
        })
      );
    }
  };
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading: loadingOrders, orders, error: errorOrders } = orderMineList;
  useEffect(() => {
    if (success) {
      return () => {};
    }
    if (!user.name) {
      dispatch(detailsUser(userSignin.userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setSellerName(user.seller ? user.seller.name : '');
      setSellerLogo(user.seller ? user.seller.logo : '');
      setSellerDescription(user.seller ? user.seller.description : '');
    }
    dispatch(listOrderMine());
    return () => {};
  }, [user, success]);
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setSellerLogo(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <Row>
      <Col md={4}>
        <h2> Profile</h2>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">Profile Saved Successfully.</MessageBox>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {user.isSeller && (
            <>
              <h2>Seller</h2>
              <Form.Group controlId="sellerName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Seller Name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={sellerLogo}
                  onChange={(e) => setSellerLogo(e.target.value)}
                />
                <Form.File
                  id="image-file"
                  label="Choose Logo"
                  custom
                  onChange={uploadFileHandler}
                />
                {uploading && <LoadingBox />}
              </Form.Group>
              <Form.Group controlId="sellerDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter Description"
                  value={sellerDescription}
                  onChange={(e) => setSellerDescription(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h2>Order History</h2>
        {loadingOrders ? (
          <LoadingBox />
        ) : errorOrders ? (
          <MessageBox variant="danger">{errorOrders} </MessageBox>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
