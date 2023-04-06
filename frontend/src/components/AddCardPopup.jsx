import { useEffect } from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';

const AddCardPopup = ({ isOpen, onClose, onAddCard, isLoad }) => {
  const { values, isValid, handleChange, errors, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddCard(values);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="photo_card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={isLoad ? 'Сохраняем...' : 'Сохранить'}
      isValid={isValid}>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        id="place-name"
        value={values.name || ''}
        placeholder="Название"
        className="popup__input popup__input_type_place"
        required
        minLength="1"
        maxLength="30"
      />
      <span
        className={`popup__error place-name-error ${
          isValid ? '' : 'popup__error_visible'
        }`}>
        {errors.name}
      </span>
      <input
        onChange={handleChange}
        type="url"
        name="link"
        id="place-link"
        value={values.link || ''}
        placeholder="Ссылка изображения"
        className="popup__input popup__input_type_link"
        required
      />
      <span
        className={`popup__error place-link-error ${
          isValid ? '' : 'popup__error_visible'
        }`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
};

export default AddCardPopup;
