import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.avatar}
          alt="Аватар"
          className="profile__avatar"
        />
        <button
          className="profile__avatar-edit"
          onClick={onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={onEditProfile}></button>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}></button>
      </section>

      <section className="photo">
        <ul className="photo__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
