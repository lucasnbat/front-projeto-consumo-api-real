import React from 'react';
import {
  FaHome, FaSignInAlt, FaUserAlt, FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleLogout = (e) => {
    e.preventDefault();
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      <Link onClick={handleLogout} to="/logout">
        <FaSignInAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link to="login">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link>
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}

    </Nav>
  );
}
