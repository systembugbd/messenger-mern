import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../types/type';
export const authActionRegisterPost = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/user/register', data, config);
      // console.log(msg.data);
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
      const errorMessage = error.response.data.error.errorMessage;
      dispatch({
        type: REGISTER_FAIL,
        payload: { error: errorMessage },
      });
      // console.log(error.response.data);
    }
  };
};
