import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';

const ProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoad }) => {
  const { values, setValues, isValid, handleChange, errors, resetForm } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser({
        name: values.name,
        about: values.title,
      });
    }
  }
  useEffect(() => {
    setValues({
      name: currentUser.name,
      title: currentUser.about,
    });
    if (!isOpen) {
      resetForm();
    }
  }, [currentUser, isOpen, resetForm, setValues]);

  return (
    <PopupWithForm
      name="profile_edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={isLoad ? 'Сохраняем...' : 'Сохранить'}
      isValid={isValid}>
      <input
        type="text"
        name="name"
        id="profile-name"
        value={values.name || ''}
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
      />
      <span
        className={`popup__error profile-name-error ${
          isValid ? '' : 'popup__error_visible'
        }`}>
        {errors.name}
      </span>
      <input
        type="text"
        name="title"
        id="profile-title"
        value={values.title || ''}
        placeholder="Деятельность"
        className="popup__input popup__input_type_title"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
      />
      <span
        className={`popup__error profile-title-error ${
          isValid ? '' : 'popup__error_visible'
        }`}>
        {errors.title}
      </span>
    </PopupWithForm>
  );
};

export default ProfilePopup;
