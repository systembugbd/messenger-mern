import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../types/type';

export const authActionRegisterPost = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/user/register', data, config);

      const token = response.data.token;

      localStorage.setItem('authToken', token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: token,
        },
      });
    } catch (error) {
      const errorMessages =
        typeof error.response.data.error === 'object'
          ? error.response.data.error.errorMessage
          : [];

      dispatch({
        type: REGISTER_FAIL,
        payload: { error: errorMessages },
      });
      // console.log(error.response.data);
    }
  };
};

/**
 * authActionLogin Post Called from login.jsx
 * @param {*} data
 * @returns payload and types with dispatch
 */
export const authActionLoginPost = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/user/login', data, config);
      const token = response.data.token;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: token,
        },
      });

      localStorage.setItem('authToken', token);
      localStorage.setItem('successMessage', response.data.successMessage);
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};
