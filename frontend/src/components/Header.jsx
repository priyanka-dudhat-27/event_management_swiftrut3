/* eslint-disable no-unused-vars */
// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext'; 
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">MyApp</Link>
        </div>
        <nav className="space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

export default Header;
