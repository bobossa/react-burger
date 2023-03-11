import {
  ORDER_DETAILS_GET,
  ORDER_DETAILS_GET_FAIL,
  ORDER_DETAILS_GET_OK,
  ORDER_DETAILS_DELETE,
} from "../actions/actions";

const initState = {
  orderDetails: null,
  orderReq: false,
  orderFail: false,
};

export const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_GET: {
      return {
        ...state,
        orderReq: true,
        orderFail: false,
      };
    }
    case ORDER_DETAILS_GET_FAIL: {
      return {
        ...state,
        orderReq: false,
        orderFail: true,
      };
    }
    case ORDER_DETAILS_GET_OK: {
      return {
        ...state,
        orderReq: false,
        orderDetails: action.result,
      };
    }
    case ORDER_DETAILS_DELETE: {
      return {
        ...state,
        orderDetails: null,
      };
    }

    default: {
      return state;
    }
  }
};
