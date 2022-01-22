import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsThreeDots, FaEdit, BiSearch } from 'react-icons/all';

function Dashboard() {
  const navigate = useNavigate();
  const { authenticated, successMessage } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (!authenticated && !successMessage) {
      navigate('/');
    }
  }, [authenticated, successMessage]);
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      'images/user/238430439466_passportsize.png'
                    }
                    width="40"
                    height="40"
                    alt="user"
                  />
                </div>
                <div className="name">
                  <h4>Shaheb Ali</h4>
                </div>
              </div>
              <div className="icons">
                <div className="icon first">
                  <BsThreeDots />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="search">
              <label for="search">
                <BiSearch />
              </label>
              <input
                type="search"
                value={search}
                onChange={handleSearch}
                name="search"
                id="search"
              />
            </div>
          </div>
        </div>
        <div className="col-9">
          <h4>Main Section</h4>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
