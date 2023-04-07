require('dotenv').config();

const { NODE_ENV = 'production' } = process.env;
const { PORT = '3000' } = process.env;
const { JWT_SECRET = 'byfvbdsvianscniawohfuh893rfio3jfiso' } = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
};
