import {
  SET_ORDER_DETAILS_MODAL_OPEN,
  SET_INGREDIENTS_MODAL_OPEN,
} from "../actions/actions";

export const setOrderDetailsModalOpen = (isOpen) => ({
  type: SET_ORDER_DETAILS_MODAL_OPEN,
  result: isOpen,
});
export const setIngredientModalOpen = (isOpen) => ({
  type: SET_INGREDIENTS_MODAL_OPEN,
  result: isOpen,
});
