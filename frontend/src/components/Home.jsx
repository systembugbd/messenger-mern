import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const { authenticated, successMessage } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>Home Page</h1>
      {!authenticated && !successMessage && (
        <>
          <Link to="/messenger/register">Register</Link>
          <br />
          <Link to="/messenger/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default Home;
