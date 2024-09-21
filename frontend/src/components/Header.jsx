/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext'; // Ensure this is the correct path and case
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // This should update the user state to null
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
          
          {!user ? ( // Check for the user state
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
            <>
            <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
            </>
            
          )}
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Header;
