import axios from 'axios';
export const authActionRegisterPost = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const msg = await axios.post('/user/register', data, config);
      console.log(msg.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
