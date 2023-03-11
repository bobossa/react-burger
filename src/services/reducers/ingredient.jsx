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
} from "../actions/actions";

const initState = {
  ingredients: [],
  selectedIngredient: null,
  selectedIngredients: [],
  ingredientsReq: false,
  ingredientsFail: false,
};

export const ingredientReducer = (state = initState, action) => {
  switch (action.type) {
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
