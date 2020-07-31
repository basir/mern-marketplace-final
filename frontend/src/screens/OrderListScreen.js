import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrders, deleteOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';

function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete this order?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  return loading ? (
    <LoadingBox />
  ) : (
    <>
      <h1>Orders</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>USER</th>
            <th>SELLER</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.seller.name}</td>
              <td>{order.paidAt ? order.paidAt.substring(0, 10) : 'No'}</td>
              <td>
                {order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'No'}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
                <Button
                  type="button"
                  className="btn-sm"
                  onClick={() => deleteHandler(order)}
                  variant="light"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default OrderListScreen;
