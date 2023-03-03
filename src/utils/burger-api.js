import { GET_DATA_URL } from "./constants";

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${GET_DATA_URL}/ingredients`).then((res) => checkResponse(res));
};
