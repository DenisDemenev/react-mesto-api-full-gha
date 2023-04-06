import React from 'react';
import { Link } from 'react-router-dom';

const AuthWithForm = ({
  children,
  title,
  name,
  onSubmit,
  isValid,
  btnText,
}) => {
  return (
    <div className="auth">
      <h3 className="auth__title">{title}</h3>
      <form
        onSubmit={onSubmit}
        name={`${name}_form`}
        className="auth__form"
        noValidate>
        {children}
        <button
          className={`auth__button ${!isValid ? 'auth__button_disabled' : ''}`}
          disabled={!isValid}
          type="submit"
          aria-label="Сохранить">
          {btnText}
        </button>
      </form>
      {name === 'register' ? (
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      ) : (
        <Link className="auth__link" to="/sign-up">
          Еще нет акаунта? Зарегистрироваться
        </Link>
      )}
    </div>
  );
};

export default AuthWithForm;
