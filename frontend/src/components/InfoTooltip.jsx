import React from 'react';
import okImage from '.././images/ok.png';
import errorImage from '.././images/error.png';

const InfoTooltip = ({ onOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup ${onOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          onClick={onClose}></button>
        <img
          className="popup__tooltip-image"
          src={isSuccess ? okImage : errorImage}
          alt={isSuccess ? 'Успешно' : 'Ошибка'}
        />
        <p className="popup__tooltip-capture">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
