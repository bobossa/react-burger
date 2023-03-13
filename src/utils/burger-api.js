import { GET_DATA_URL } from "./constants";

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsList = () => {
  return fetch(`${GET_DATA_URL}/ingredients`).then((res) => checkResponse(res));
};

export const makeOrder = (ingredients) => {
  const data = {
    ingredients: ingredients,
  };

  return fetch(`${GET_DATA_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};
