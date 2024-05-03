import React from 'react';
import {
  FaHome, FaSignInAlt, FaUserAlt, FaCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/login">
        <FaSignInAlt size={24} />
      </Link>

      {isLoggedIn ? (<FaCircle size={24} color="#50C878" />) : (<FaCircle size={24} color="#E2CAB0" />) }

    </Nav>
  );
}
