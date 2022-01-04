import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div className="card">
        <div className="card__header">
          <h3>Register</h3>
        </div>
        <div className="card__body">
          <form className="form" onSubmit={handleLogin}>
            <div className="form__group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={username}
                onChange={handleInputUsername}
                placeholder="Username"
                id="username"
              />
            </div>

            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleInputPassword}
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
