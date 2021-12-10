import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/messenger/register">not registere yet? Register</Link>
    </div>
  );
}

export default Login;
