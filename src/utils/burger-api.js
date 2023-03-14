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

export const getUserData = (token) => {
  return fetch(`${GET_DATA_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  }).then((res) => checkResponse(res));
};

export const register = (email, name, password) => {
  return fetch(`${GET_DATA_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((res) => checkResponse(res));
};

export const sendEmail = (email) => {
  return fetch(`${GET_DATA_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then((res) => checkResponse(res));
};

export const resetPassword = (passwordValue, codeValue) => {
  return fetch(`${GET_DATA_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: passwordValue,
      token: codeValue,
    }),
  }).then((res) => checkResponse(res));
};

export const login = (email, password) => {
  return fetch(`${GET_DATA_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
};

export const updateUserData = (token, name, email, password) => {
  return fetch(`${GET_DATA_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  }).then((res) => checkResponse(res));
};

export const refreshToken = (refreshToken) => {
  return fetch(`${GET_DATA_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};

export const logout = (refreshToken) => {
  return fetch(`${GET_DATA_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((res) => checkResponse(res));
};
