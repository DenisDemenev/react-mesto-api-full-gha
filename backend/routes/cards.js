const router = require('express').Router();
const {
  getCards,
  createCard,
  removeCard,
  addLike,
  removeLike,
} = require('../controllers/cards');
const { cardIdValidation, cardValidation } = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', cardValidation, createCard);

router.delete('/:cardId', cardIdValidation, removeCard);

router.put('/:cardId/likes', cardIdValidation, addLike);

router.delete('/:cardId/likes', cardIdValidation, removeLike);

module.exports = router;
