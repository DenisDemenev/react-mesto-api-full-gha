import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';
import AuthWithForm from './AuthWithForm';

const Register = ({ isLoad, handleRegister, loggedIn }) => {
  const navigate = useNavigate();
  const { values, isValid, handleChange, errors } = useFormAndValidation();

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email: values.email, password: values.password });
  };

  return (
    <AuthWithForm
      name="register"
      title="Регистрация"
      onSubmit={handleSubmit}
      btnText={isLoad ? 'Регистрация...' : 'Зарегистрироваться'}
      isValid={isValid}>
      <input
        type="email"
        name="email"
        id="email"
        value={values.email || ''}
        placeholder="Email"
        className="auth__input popup__input_type_email"
        required
        onChange={handleChange}
      />
      <span
        className={`popup__error email-error ${
          isValid ? '' : 'popup__error_visible'
        }`}>
        {errors.email}
      </span>
      <input
        type="password"
        name="password"
        id="password"
        value={values.password || ''}
        placeholder="Пароль"
        className="auth__input popup__input_type_password"
        required
        minLength="6"
        onChange={handleChange}
      />
      <span
        className={`popup__error password-error ${
          isValid ? '' : 'popup__error_visible'
        }`}>
        {errors.password}
      </span>
    </AuthWithForm>
  );
};

export default Register;
