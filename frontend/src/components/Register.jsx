import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const handleInput = () => {};
  return (
    <div className="register">
      <div className="card">
        <div className="card__header">
          <h3>Register</h3>
        </div>
        <div className="card__body">
          <form className="form">
            <div className="form__group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value=""
                onChange={handleInput}
                placeholder="Username"
                id="username"
              />
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                value=""
                onChange={handleInput}
                autoComplete="off"
                id="email"
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value=""
                onChange={handleInput}
                id="password"
              />
            </div>
            <div className="form__group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={handleInput}
                id="confirmPassword"
              />
            </div>
            <div className="form__group form__group--files">
              <div className="image">
                <img
                  src={process.env.PUBLIC_URL + '/logo512.png'}
                  alt=""
                  width="50"
                />
              </div>
              <div className="file">
                <label htmlFor="files">Select image</label>
                <input type="file" id="files" />
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
