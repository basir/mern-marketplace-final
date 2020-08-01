import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_RESET:
      return {};
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderDetailsReducer(
  state = {
    loading: true,
    order: {
      orderItems: [],
      shippingAddress: {},
      paymentMethod: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderMineListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderListReducer(state = { loading: true, orders: [] }, action) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderPayReducer(
  state = {
    order: {
      orderItems: [],
      shippingAddress: {},
      paymentMethod: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {
        order: {
          orderItems: [],
          shippingAddress: {},
          paymentMethod: {},
        },
      };
    default:
      return state;
  }
}

function orderDeliverReducer(
  state = {
    order: {
      orderItems: [],
      shippingAddress: {},
      paymentMethod: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {
        order: {
          orderItems: [],
          shippingAddress: {},
          paymentMethod: {},
        },
      };
    default:
      return state;
  }
}

function orderDeleteReducer(
  state = {
    order: {
      orderItems: [],
      shippingAddress: {},
      paymentMethod: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
};
