import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ProfilePopup from './ProfilePopup';
import AddCardPopup from './AddCardPopup';
import AvatarPopup from './AvatarPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import { CurrentUserContext } from '../context/CurrentUserContext';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../utils/Api';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import * as auth from '../utils/authApi';
import InfoTooltip from './InfoTooltip';

const App = () => {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsTooltipPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((newCard) => newCard._id !== card._id)
        );
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  };

  const handleUpdateUser = (newUser) => {
    setLoading(true);
    api
      .setUserInfo(newUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setLoading(true);
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  };

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }

  const handleRegister = ({ email, password }) => {
    setLoading(true);
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        handleTooltip();
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        handleTooltip();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTooltip = () => {
    setIsTooltipPopupOpen(true);
  };

  const handleLogin = ({ email, password }) => {
    setLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
        }
        setEmail(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onMail={email}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />

          <Route
            path="/sign-in"
            element={
              <Login
                isLoad={isLoading}
                handleLogin={handleLogin}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                isLoad={isLoading}
                handleRegister={handleRegister}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
        <Footer />
        <ProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoading}
        />
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isLoad={isLoading}
        />
        <AvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups}
          onOpen={isTooltipPopupOpen}
          isSuccess={isSuccess}
        />
      </CurrentUserContext.Provider>
    </>
  );
};

export default App;
