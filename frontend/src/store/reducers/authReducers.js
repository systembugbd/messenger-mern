import {
  ERROR_MESSAGE_CLEAR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
} from '../types/type';
import jwtDecodeToken from 'jwt-decode';

const authState = {
  loading: true,
  authenticated: false,
  error: '',
  successMessage: '',
  userInfo: '',
};

const tokenDecode = (token) => {
  const tokenDecoded = jwtDecodeToken(token);
  const expireDate = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expireDate) {
    return null;
  }
  return tokenDecoded;
};

const authToken = localStorage.getItem('authToken');
if (authToken) {
  const userInfoTokenDecoded = tokenDecode(authToken);
  if (userInfoTokenDecoded) {
    authState.userInfo = userInfoTokenDecoded;
    authState.authenticated = authState.successMessage ? true : false;
    authState.loading = false;
  }
}

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;
  try {
    if (type === REGISTER_FAIL) {
      return {
        ...state,
        error: payload.error,
        loading: true,
        authenticated: false,
        successMessage: '',
        userInfo: '',
      };
    }
    if (type === REGISTER_SUCCESS) {
      const userInfoToken = tokenDecode(payload.token);
      return {
        ...state,
        loading: false,
        authenticated: true,
        error: '',
        successMessage: payload.successMessage,
        userInfo: userInfoToken,
      };
    }
    if (type === SUCCESS_MESSAGE_CLEAR) {
      return {
        ...state,
        successMessage: '',
        authenticated: false,
      };
    }
    if (type === ERROR_MESSAGE_CLEAR) {
      return {
        ...state,
        error: '',
      };
    }
  } catch (error) {
    console.error('I m from authReducers', error);
  }

  return state;
};
