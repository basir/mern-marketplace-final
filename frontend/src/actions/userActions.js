import axios from 'axios';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_TOPSELLERS_LIST_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
} from '../constants/userConstants';

const listUsers = (category = '', searchKeyword = '', sortOrder = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/users?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`
    );
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });

    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();

    const { data } = await axios.put(`/api/users/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const detailsUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const listTopSellers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
    const { data } = await axios.get('/api/users/top-sellers');
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_TOPSELLERS_LIST_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const { data } = await axios.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const updateUserProfile = (user) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: user,
  });
  try {
    const { data } = await axios.put(
      `/api/users/profile/${userInfo._id}`,
      user,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/api/users/signin', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};
export {
  signin,
  register,
  signout,
  updateUserProfile,
  listUsers,
  detailsUser,
  updateUser,
  deleteUser,
  listTopSellers,
};
