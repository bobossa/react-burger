import {
  GET_USER_DATA,
  GET_USER_DATA_OK,
  GET_USER_DATA_FAIL,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_OK,
  UPDATE_USER_DATA_FAIL,
  LOGOUT,
  LOGOUT_OK,
  LOGOUT_FAIL,
  REGISTER,
  REGISTER_OK,
  REGISTER_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_OK,
  REFRESH_TOKEN_FAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OK,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_OK,
  RESET_PASSWORD_FAIL,
  SET_FORGOT_PASSWORD_STATE,
} from "../actions/user";

const initialState = {
  getUserDataReq: false,
  getUserDataReqFail: false,
  updateUserDataReq: false,
  updateUserDataReqFail: false,
  logoutReq: false,
  logoutReqFail: false,
  registerReq: false,
  registerReqFail: false,
  loginReq: false,
  loginReqFail: false,
  refreshTokenReq: false,
  refreshTokenReqFail: false,
  forgotPasswordReq: false,
  forgotPasswordReqFail: false,
  resetPasswordReq: false,
  resetPasswordReqFail: false,
  isPasswordForgot: false,
  accessToken: null,
  userData: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...state,
        getUserDataReq: true,
        getUserDataReqFail: false,
      };
    }
    case GET_USER_DATA_OK: {
      return {
        ...state,
        getUserDataReq: false,
        userData: action.payload,
      };
    }
    case GET_USER_DATA_FAIL: {
      return {
        ...state,
        getUserDataReq: false,
        getUserDataReqFail: true,
      };
    }
    case UPDATE_USER_DATA: {
      return {
        ...state,
        updateUserDataReq: true,
        updateUserDataReqFail: false,
      };
    }
    case UPDATE_USER_DATA_OK: {
      return {
        ...state,
        updateUserDataReq: false,
        userData: action.payload,
      };
    }
    case UPDATE_USER_DATA_FAIL: {
      return {
        ...state,
        updateUserDataReq: false,
        updateUserDataReqFail: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        logoutReq: true,
        logoutReqFail: false,
      };
    }
    case LOGOUT_OK: {
      return {
        ...state,
        logoutReq: false,
        userData: null,
        accessToken: null,
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        logoutReq: false,
        logoutReqFail: true,
      };
    }
    case REGISTER: {
      return {
        ...state,
        registerReq: true,
        registerReqFail: false,
      };
    }
    case REGISTER_OK: {
      return {
        ...state,
        registerReq: false,
        accessToken: action.payload,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        registerReq: false,
        registerReqFail: true,
      };
    }

    case LOGIN: {
      return {
        ...state,
        loginReq: true,
        loginReqFail: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginReq: false,
        accessToken: action.payload.accessToken,
        userData: action.payload.user,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginReq: false,
        loginReqFail: true,
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        refreshTokenReq: true,
        refreshTokenReqFail: false,
      };
    }
    case REFRESH_TOKEN_OK: {
      return {
        ...state,
        refreshTokenReq: false,
        accessToken: action.payload,
      };
    }
    case REFRESH_TOKEN_FAIL: {
      return {
        ...state,
        refreshTokenReq: false,
        refreshTokenReqFail: true,
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        forgotPasswordReq: true,
        forgotPasswordReqFail: false,
      };
    }
    case FORGOT_PASSWORD_OK: {
      return {
        ...state,
        forgotPasswordReq: false,
      };
    }
    case FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        forgotPasswordReq: false,
        forgotPasswordReqFail: true,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        resetPasswordReq: true,
        resetPasswordReqFail: false,
      };
    }

    case RESET_PASSWORD_OK: {
      return {
        ...state,
        resetPasswordReq: false,
      };
    }

    case RESET_PASSWORD_FAIL: {
      return {
        ...state,
        resetPasswordReq: false,
        resetPasswordReqFail: true,
      };
    }
    case SET_FORGOT_PASSWORD_STATE: {
      return {
        ...state,
        isPasswordForgot: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
