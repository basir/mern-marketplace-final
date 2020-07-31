import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  Button,
  Row,
  Col,
  Card,
  Image,
  ListGroupItem,
} from 'react-bootstrap';
import axios from 'axios';
import { detailsOrder, payOrder } from '../actions/orderActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen(props) {
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      order &&
      (!order._id || order._id !== props.match.params.id || successPay)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(props.match.params.id));
    } else if (order && !order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    return () => {};
  }, [order, successPay]);

  const handleSuccessPayment = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(order, paymentResult));
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="py-3">
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h4>Shipping</h4>
              <div>
                <strong>Name:</strong> {order.user.name}{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                <br />
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city},{order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country},
              </div>
              <div>
                {order.isDelivered ? (
                  <MessageBox variant="info">
                    Paid at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <h4>Payment</h4>
              <div>
                <strong>Method:</strong> {order.paymentMethod}
              </div>
              <div>
                {order.isPaid ? (
                  <MessageBox variant="info">Paid at {order.paidAt}</MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <h4>Order Items</h4>
              {order.orderItems.length === 0 ? (
                <MessageBox>Cart is empty</MessageBox>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="text-right">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Order Total</strong>
                  </Col>
                  <Col>
                    <strong>${order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <div>Finishing Payment...</div>}
                  {!order.isPaid && !sdkReady && <div>Loading PayPal...</div>}
                  {!order.isPaid && sdkReady && (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <li>
                    <Button type="button" className="btn-block">
                      Deliver Order
                    </Button>
                  </li>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
