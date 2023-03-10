import { makeOrder } from "../../utils/burger-api";
import { ingredientsDelete } from "../actions/ingredients";

import {
  ORDER_DETAILS_GET,
  ORDER_DETAILS_DELETE,
  ORDER_DETAILS_GET_FAIL,
  ORDER_DETAILS_GET_OK,
} from "../actions/actions";

export const setOrderDetailsLoad = () => ({
  type: ORDER_DETAILS_GET,
});

export const orderDetailsDelete = () => ({
  type: ORDER_DETAILS_DELETE,
});

export const setOrderDetailsLoadOk = (data) => ({
  type: ORDER_DETAILS_GET_OK,
  result: data,
});

export const setOrderDataLoadingFailed = () => ({
  type: ORDER_DETAILS_GET_FAIL,
});

export function getOrdeDetails(ingredientsIds) {
  return function (dispatch) {
    dispatch(setOrderDetailsLoad());

    makeOrder(ingredientsIds)
      .then((data) => {
        if (data) {
          dispatch(setOrderDetailsLoadOk(data));
        }
      })
      .then(dispatch(ingredientsDelete()))
      .catch(dispatch(setOrderDataLoadingFailed()));
  };
}
