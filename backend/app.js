const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorsLogger } = require('./middlewares/loggers');
const { signUpValidation, signInValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Успешное подключение к БД'))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err}`));

const app = express();
app.use(cors({ origin: ['http://localhost:3001', 'https://ekbtoys.ru', 'http://ekbtoys.ru'], credentials: true }));

app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signInValidation, login);

app.post('/signup', signUpValidation, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorsLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}`);
});
