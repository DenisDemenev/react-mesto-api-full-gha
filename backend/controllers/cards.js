const card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const CREATED = 201;

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await card.find({}).populate(['owner', 'likes']);
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await card.create({ name, link, owner: req.user._id });
    res.status(CREATED).send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при создании карточки',
        ),
      );
    } else {
      next(err);
    }
  }
};

module.exports.removeCard = async (req, res, next) => {
  try {
    const removedCard = await card.findById(req.params.cardId);
    if (!removedCard) {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }

    if (removedCard.owner.toString() !== req.user._id) {
      return next(new ForbiddenError('Нельзя удалять чужую карточку'));
    }

    await card.deleteOne(removedCard);
    return res.send(removedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Карточка с указанным _id не найдена.'));
    }
    return next(err);
  }
};

module.exports.addLike = async (req, res, next) => {
  try {
    const updatedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    }
    res.send(updatedCard);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан несуществующий _id карточки.'));
    } else {
      next(err);
    }
  }
};

module.exports.removeLike = async (req, res, next) => {
  try {
    const updatedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!updatedCard) {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
    } else {
      res.send(updatedCard);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      throw new BadRequestError('Передан несуществующий _id карточки.');
    } else {
      next(err);
    }
  }
};
