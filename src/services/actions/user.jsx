import {
  register as registerFunc,
  sendEmail as sendEmailFunc,
  login as loginFunc,
  refreshToken as refreshTokenFunc,
  resetPassword as resetPasswordFunc,
  logout as logoutFunc,
  getUserData as getUserDataFunc,
  updateUserData as sendUserDataFunc,
} from "../../utils/burger-api";

export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_DATA_OK = "GET_USER_DATA_OK";
export const GET_USER_DATA_FAIL = "GET_USER_DATA_FAIL";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const UPDATE_USER_DATA_OK = "UPDATE_USER_DATA_OK";
export const UPDATE_USER_DATA_FAIL = "UPDATE_USER_DATA_FAIL";
export const REGISTER = "REGISTER";
export const REGISTER_OK = "REGISTER_OK";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_OK = "FORGOT_PASSWORD_SECCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_OK = "RESET_PASSWORD_OK";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";
export const LOGOUT = "LOGOUT";
export const LOGOUT_OK = "LOGOUT_OK";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REFRESH_TOKEN_OK = "REFRESH_TOKEN_OK";
export const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL";
export const SET_FORGOT_PASSWORD_STATE = "SET_FORGOT_PASSWORD_STATE";

export const setRegistrationLoading = () => ({
  type: REGISTER,
});
export const setRegistrationLoadingSuccess = (token) => ({
  type: REGISTER_OK,
  payload: token,
});
export const setRegistrationLoadingFailed = () => ({
  type: REGISTER_FAIL,
});

export const setLoginLoading = () => ({
  type: LOGIN,
});
export const setLoginLoadingSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});
export const setLoginLoadingFailed = () => ({
  type: LOGIN_FAILED,
});
export const setForgotPasswordLoading = () => ({
  type: FORGOT_PASSWORD,
});
export const setForgotPasswordLoadingSuccess = () => ({
  type: FORGOT_PASSWORD_OK,
});
export const setForgotPasswordLoadingFailed = () => ({
  type: FORGOT_PASSWORD_FAIL,
});
export const setResetPasswordLoading = () => ({
  type: RESET_PASSWORD,
});
export const setResetPasswordLoadingSuccess = () => ({
  type: RESET_PASSWORD_OK,
});
export const setResetPasswordLoadingFailed = () => ({
  type: RESET_PASSWORD_FAIL,
});
export const setGetUserDataLoading = () => ({ type: GET_USER_DATA });
export const setGetUserDataLoadingSuccess = (userData) => ({
  type: GET_USER_DATA_OK,
  payload: userData,
});
export const setGetUserDataLoadingFailed = () => ({
  type: GET_USER_DATA_FAIL,
});

export const setSendUserDataLoading = () => ({
  type: UPDATE_USER_DATA,
});
export const setSendUserDataLoadingSuccess = (userData) => ({
  type: UPDATE_USER_DATA_OK,
  payload: userData,
});
export const setSendUserDataLoadingFailed = () => ({
  type: UPDATE_USER_DATA_FAIL,
});

export const setLogoutLoading = () => ({
  type: LOGOUT,
});
export const setLogoutLoadingSuccess = () => ({
  type: LOGOUT_OK,
});
export const setLogoutLoadingFailed = () => ({
  type: LOGOUT_FAIL,
});

export const setRefreshTokenLoading = () => ({
  type: REFRESH_TOKEN,
});
export const setRefreshTokenLoadingSuccess = (token) => ({
  type: REFRESH_TOKEN_OK,
  payload: token,
});
export const setRefreshTokenLoadingFailed = () => ({
  type: REFRESH_TOKEN_FAIL,
});

export const setForgotPasswordState = (state) => ({
  type: SET_FORGOT_PASSWORD_STATE,
  payload: state,
});

export const registration = (email, name, password) => {
  return (dispatch) => {
    dispatch(setRegistrationLoading());

    registerFunc(email, name, password)
      .then((res) => {
        dispatch(setRegistrationLoadingSuccess(res.accessToken));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        dispatch(setRegistrationLoadingFailed());
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoginLoading());
    loginFunc(email, password)
      .then((res) => {
        dispatch(setLoginLoadingSuccess(res));
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        dispatch(setLoginLoadingFailed());
        console.log(err);
      });
  };
};

export const getUserData = (accessToken) => {
  return (dispatch) => {
    dispatch(setGetUserDataLoading());

    getUserDataFunc(accessToken)
      .then((res) => {
        dispatch(setGetUserDataLoadingSuccess(res.user));
      })
      .catch((err) => {
        dispatch(setGetUserDataLoadingFailed());

        if (err.status === 403 || err.status === 401) {
          dispatch(
            refreshToken(localStorage.getItem("refreshToken"), "getUserData")
          );
        }
      });
  };
};

export const updateUserData = (accessToken, name, email, password) => {
  return (dispatch) => {
    dispatch(setSendUserDataLoading());

    sendUserDataFunc(accessToken, name, email, password)
      .then((res) => {
        dispatch(setSendUserDataLoadingSuccess(res.user));
      })
      .catch((err) => {
        if (err.status === 403) {
          dispatch(refreshToken(localStorage.getItem("refreshToken")));
        }

        dispatch(setSendUserDataLoadingFailed());
      });
  };
};

export const refreshToken = (refreshToken) => {
  return (dispatch) => {
    dispatch(setRefreshTokenLoading());

    refreshTokenFunc(refreshToken)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setRefreshTokenLoadingSuccess(res.accessToken));
      })
      .catch((err) => {
        dispatch(setRefreshTokenLoadingFailed());
      });
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch(setForgotPasswordLoading());

    sendEmailFunc(email)
      .then(() => {
        setForgotPasswordLoadingSuccess();
      })
      .catch((err) => {
        setForgotPasswordLoadingFailed();
      });
  };
};

export const resetPassword = (password, code) => {
  return (dispatch) => {
    dispatch(setResetPasswordLoading());

    resetPasswordFunc(password, code)
      .then(() => {
        setResetPasswordLoadingSuccess();
      })
      .catch((err) => {
        setResetPasswordLoadingFailed();
      });
  };
};

export const logout = (refreshToken) => {
  return (dispatch) => {
    dispatch(setLogoutLoading());
    logoutFunc(refreshToken)
      .then(() => {
        localStorage.removeItem("refreshToken");
        dispatch(setLogoutLoadingSuccess());
      })
      .catch((err) => {
        dispatch(setLoginLoadingFailed());
      });
  };
};
