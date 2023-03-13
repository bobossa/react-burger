import { getIngredientsList } from "../../utils/burger-api";

import {
  INGREDIENT_ADD,
  INGREDIENT_DELETE,
  INGREDIENTS_DELETE,
  INGREDIENTS_GET,
  INGREDIENT_SELECT,
  SELECTED_INGREDIENT_DELETE,
  INGREDIENT_MOVE,
  INGREDIENTS_GET_FAIL,
  INGREDIENTS_GET_OK,
} from "../actions/actions";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: INGREDIENTS_GET,
    });

    getIngredientsList()
      .then((ingredientsData) => {
        if (ingredientsData) {
          dispatch({
            type: INGREDIENTS_GET_OK,
            result: ingredientsData.data,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: INGREDIENTS_GET_FAIL,
        })
      );
  };
};

export const ingredientAdd = (newIngredientsArray) => ({
  type: INGREDIENT_ADD,
  result: newIngredientsArray,
});

export const ingredientDelete = (newIngredientsArray) => ({
  type: INGREDIENT_DELETE,
  result: newIngredientsArray,
});

export const ingredientsDelete = () => ({
  type: INGREDIENTS_DELETE,
});

export const ingredientSelect = (ingredient) => ({
  type: INGREDIENT_SELECT,
  result: ingredient,
});

export const selectedIngredientDelete = () => ({
  type: SELECTED_INGREDIENT_DELETE,
});

export const ingredientsMove = (newIngredientsArray) => ({
  type: INGREDIENT_MOVE,
  result: newIngredientsArray,
});
