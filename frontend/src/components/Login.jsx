import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActionLoginPost } from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { authenticated, successMessage, error, userInfo } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handelInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(authActionLoginPost(state));
  };

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard');
    }

    if (successMessage) {
      alert.success(successMessage);
    }
    if (error) {
      error.map((err) => alert.error(err));
    }
  }, [successMessage, error, userInfo]);

  return (
    <div className="login">
      <div className="card">
        <div className="card__header">
          <h3>Login</h3>
        </div>
        <div className="card__body">
          <form className="form" onSubmit={handleLogin}>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={state.email}
                onChange={handelInput}
                placeholder="Email"
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
                onChange={handelInput}
                id="password"
              />
            </div>

            <div className="form__group">
              <input type="submit" value="Login" className="btn btn--Login" />
            </div>
            <div className="form__group">
              <Link to="/messenger/register" className="link">
                Not registered yet? Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
