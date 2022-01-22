import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActionRegisterPost } from './../store/actions/authAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {
  SUCCESS_MESSAGE_CLEAR,
  ERROR_MESSAGE_CLEAR,
} from '../store/types/type';
function Register() {
  //to dispass a task to reducer function
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //to alert()
  const alert = useAlert();
  const { loading, authenticated, error, successMessage, userInfo } =
    useSelector((state) => state.auth);

  // console.log(userInfo);
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });
  const [loadImage, setLoadImage] = useState('');

  //handle form input
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //handle image input
  const handleUserImageFiles = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    //read file image to show left side image in registration page
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = () => setLoadImage(reader.result);
    reader.onerror = (error) => console.log(error.message);
  };

  /**
   * @form onSubmit handle
   * @param {e}  registration form handle
   */
  const handleRegister = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, image } = state;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('image', image);

    //dispatch formData to authActionRegisterPost action controller
    dispatch(authActionRegisterPost(formData));
  };

  useEffect(() => {
    if (authenticated) {
      navigate('/messenger/login');
    }
    if (successMessage) {
      alert.success(successMessage);
      alert.show('Redirecting to login page...');
      setTimeout(() => {
        dispatch({
          type: SUCCESS_MESSAGE_CLEAR,
        });
      }, 5000);

      return alert;
    }

    if (error) {
      error.map((err) => alert.error(err));
      setTimeout(() => {
        dispatch({
          type: ERROR_MESSAGE_CLEAR,
        });
      }, 5000);
      return alert;
    }
    setTimeout(() => {
      if (successMessage) {
        alert.remove(alert);
      }
      alert.removeAll();
    }, 1000);
  }, [successMessage, error, alert]);

  return (
    <div className="register">
      <div className="card">
        <div className="card__header">
          <h3>Register</h3>
        </div>
        <div className="card__body">
          <form onSubmit={handleRegister} className="form">
            <div className="form__group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={state.username}
                onChange={handleInput}
                placeholder="Username"
                autoComplete="on"
                id="username"
              />
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={state.email}
                onChange={handleInput}
                autoComplete="on"
                id="email"
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                onChange={handleInput}
                id="password"
              />
            </div>
            <div className="form__group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={state.confirmPassword}
                onChange={handleInput}
                id="confirmPassword"
              />
            </div>
            <div className="form__group form__group--files">
              <div className="image">
                <img
                  src={
                    loadImage
                      ? loadImage
                      : process.env.PUBLIC_URL + '/logo512.png'
                  }
                  alt=""
                  width="50"
                />
              </div>
              <div className="file">
                <label htmlFor="files">Select image</label>
                <input
                  type="file"
                  id="files"
                  name="image"
                  onChange={handleUserImageFiles}
                />
              </div>
            </div>
            <div className="form__group">
              <input
                type="submit"
                value="Register"
                className="btn btn--submit"
              />
            </div>
            <div className="form__group">
              <Link to="/messenger/login" className="link">
                Already registered? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
