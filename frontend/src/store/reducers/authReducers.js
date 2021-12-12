import { REGISTER_FAIL, REGISTER_SUCCESS } from '../types/type';
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

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

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

  return state;
};
