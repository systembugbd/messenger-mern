import {
  ERROR_MESSAGE_CLEAR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUCCESS_MESSAGE_CLEAR,
} from '../types/type';
import jwtDecodeToken from 'jwt-decode';
/**
 * Define Auth State
 */
const authState = {
  loading: true,
  authenticated: false,
  error: '',
  successMessage: '',
  userInfo: '',
};
/**
 * Decode JWT Token
 * @param {string} token
 * @returns token Decoded or null
 */
const tokenDecode = (token) => {
  const tokenDecoded = jwtDecodeToken(token);
  const expireDate = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expireDate) {
    return null;
  }
  return tokenDecoded;
};
/**
 * get Local Storate token and set to authState
 */
const authToken = localStorage.getItem('authToken');
const successMessage = localStorage.getItem('successMessage');
if (authToken) {
  const userInfoTokenDecoded = tokenDecode(authToken);
  if (userInfoTokenDecoded) {
    authState.userInfo = userInfoTokenDecoded;
    authState.authenticated = successMessage ? true : false;
    authState.successMessage = successMessage ?? '';
    authState.loading = false;
  }
}
/**
 *
 * @param {Object} state
 * @param {event} action
 * @returns
 */
export const authReducer = (state = authState, action) => {
  const { payload, type } = action;
  try {
    if (type === REGISTER_FAIL || type === LOGIN_FAIL) {
      return {
        ...state,
        error: payload.error,
        loading: true,
        authenticated: false,
        successMessage: '',
        userInfo: '',
      };
    }
    if (type === REGISTER_SUCCESS || type === LOGIN_SUCCESS) {
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
        authenticated: true,
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
