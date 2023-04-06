import React from 'react';

const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      className={`popup popup_dark popup_photo_big ${
        card.link ? 'popup_open' : ''
      }`}>
      <div className="popup__big-photo-container">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
          aria-label="Закрыть"></button>
        <img src={card.link} alt={card.name} className="popup__big-photo" />
        <p className="popup__big-photo-capture">{card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
