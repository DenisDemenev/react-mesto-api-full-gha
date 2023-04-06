import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo__card-like ${
    isLiked && 'photo__card-like_active'
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleLikeDelete = () => {
    onCardDelete(card);
  };

  return (
    <li className="photo__card">
      {isOwn && (
        <button
          onClick={handleLikeDelete}
          className="photo__card-remove"
          type="button"
          title="Удалить"></button>
      )}
      <img
        className="photo__card-image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="photo__card-discription">
        <h2 className="photo__card-title">{card.name}</h2>
        <div className="photo__card-like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"></button>
          <span className="photo__card-like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
