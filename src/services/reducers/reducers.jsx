import {
  INGREDIENTS_GET,
  INGREDIENTS_GET_FAIL,
  INGREDIENTS_GET_OK,
  INGREDIENT_SELECT,
  INGREDIENT_ADD,
  INGREDIENT_DELETE,
  SELECTED_INGREDIENT_DELETE,
  INGREDIENT_MOVE,
  INGREDIENTS_DELETE,
  SET_INGREDIENTS_MODAL_OPEN,
  SET_ORDER_DETAILS_MODAL_OPEN,
  ORDER_DETAILS_GET,
  ORDER_DETAILS_GET_FAIL,
  ORDER_DETAILS_GET_OK,
  ORDER_DETAILS_DELETE,
} from "../actions/actions";

const initState = {
  ingredients: [],
  selectedIngredient: null,
  selectedIngredients: [],
  ingredientsReq: false,
  ingredientsFail: false,
  orderDetails: null,
  orderReq: false,
  orderFail: false,
  isOrderDetailsModalOpen: false,
  isIngredientsModalOpen: false,
};

export const rootReducer = (state = initState, action) => {
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
    case INGREDIENTS_DELETE: {
      return {
        ...state,
        selectedIngredients: [],
      };
    }
    case INGREDIENT_MOVE: {
      return {
        ...state,
        selectedIngredients: action.result,
      };
    }
    case INGREDIENTS_GET_FAIL: {
      return {
        ...state,
        ingredientsReq: false,
        ingredientsFail: true,
      };
    }
    case INGREDIENTS_GET_OK: {
      return {
        ...state,
        ingredientsReq: false,
        ingredients: action.result,
      };
    }
    case INGREDIENTS_GET: {
      return {
        ...state,
        ingredientsReq: true,
        ingredientsFail: false,
      };
    }
    case INGREDIENT_SELECT: {
      return {
        ...state,
        selectedIngredient: action.result,
      };
    }
    case SELECTED_INGREDIENT_DELETE: {
      return {
        ...state,
        selectedIngredient: null,
      };
    }
    case INGREDIENT_ADD: {
      return {
        ...state,
        selectedIngredients: action.result,
      };
    }
    case INGREDIENT_DELETE: {
      return { ...state, selectedIngredients: action.result };
    }
    default: {
      return state;
    }
  }
};
