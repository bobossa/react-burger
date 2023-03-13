import {
  SET_INGREDIENTS_MODAL_OPEN,
  SET_ORDER_DETAILS_MODAL_OPEN,
} from "../actions/actions";

const initState = {
  isOrderDetailsModalOpen: false,
  isIngredientsModalOpen: false,
};

export const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_MODAL_OPEN: {
      return {
        ...state,
        isIngredientsModalOpen: action.result,
      };
    }
    case SET_ORDER_DETAILS_MODAL_OPEN: {
      return {
        ...state,
        isOrderDetailsModalOpen: action.result,
      };
    }
    default: {
      return state;
    }
  }
};
