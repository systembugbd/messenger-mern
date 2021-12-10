import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/messenger/register">Register</Link>
      <br />
      <Link to="/messenger/login">Login</Link>
    </div>
  );
}

export default Home;
