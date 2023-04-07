const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const CREATED = 201;
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(CREATED).send({
      name: createdUser.name,
      about: createdUser.about,
      avatar: createdUser.avatar,
      email: createdUser.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Такой email уже зарегистрирован'));
    } else if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при создании пользователя',
        ),
      );
    } else {
      next(err);
    }
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при получении пользователя',
        ),
      );
    } else {
      next(err);
    }
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные в методы обновления профиля',
        ),
      );
    } else {
      next(err);
    }
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при обновлении аватара.',
        ),
      );
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'dev-secret',
      {
        expiresIn: '7d',
      },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};
