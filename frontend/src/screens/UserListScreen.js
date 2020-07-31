import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listUsers, deleteUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';

function UserListScreen() {
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure to delete this order?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <>
      <h1>Users</h1>

      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>SELLER</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isSeller ? 'YES' : ' No'}</td>
              <td>{user.isAdmin ? 'YES' : 'No'}</td>
              <td>
                <LinkContainer to={`/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    Edit
                  </Button>
                </LinkContainer>
                <Button
                  type="button"
                  className="btn-sm"
                  onClick={() => deleteHandler(user)}
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
export default UserListScreen;
