import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = ({ onMail, loggedIn, handleLogout }) => {
  const location = useLocation();
  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </a>
      {loggedIn ? (
        <div className="header__nav">
          <div className="header__nav-email">{onMail}</div>
          <Link className="header__nav-link" to="/" onClick={handleLogout}>
            Выйти
          </Link>
        </div>
      ) : (
        <div className="header_nav">
          <Link
            className="header__nav-link"
            to={location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}>
            {location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
