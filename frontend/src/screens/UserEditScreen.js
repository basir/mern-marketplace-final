import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { updateUser, detailsUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen(props) {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push(`/userlist`);
    }
    if (!user.name) {
      dispatch(detailsUser(props.match.params.id));
    } else {
      setId(user._id);
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsSeller(user.isSeller);
    }

    return () => {
      //
    };
  }, [user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: id,
        name,
        email,
        isSeller,
        isAdmin,
      })
    );
  };
  return (
    <FormContainer>
      <h1>Edit User {name}</h1>
      {loadingUpdate && <LoadingBox />}
      {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
      {loading && <LoadingBox />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {user && (
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
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isSeller">
            <Form.Check
              type="checkbox"
              label="Is Seller"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
}

export default UserEditScreen;
