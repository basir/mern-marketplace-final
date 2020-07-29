import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function OrderScreen(props) {
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push('/profile');
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {};
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
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
              <h4>Shipping Address</h4>
              <div>
                {order.shipping.address}, {order.shipping.city},
                {order.shipping.postalCode}, {order.shipping.country},
              </div>
              <div>
                {order.isDelivered
                  ? `Delivered at ${order.deliveredAt}`
                  : 'Not Delivered.'}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <h4>Payment Info</h4>
              <div>Payment Method: {order.payment.paymentMethod}</div>
              <div>
                {order.isPaid ? `Paid at ${order.paidAt}` : 'Not Paid.'}
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
                        <Col md={1}> ${item.price} </Col>
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
              <ListGroup.Item>
                {loadingPay && <div>Finishing Payment...</div>}
                {!order.isPaid && (
                  <PaypalButton
                    amount={order.totalPrice}
                    onSuccess={handleSuccessPayment}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    <Button type="button" className="btn-block">
                      Deliver Order
                    </Button>
                  </li>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
