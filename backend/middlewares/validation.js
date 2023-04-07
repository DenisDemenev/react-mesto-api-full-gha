const { celebrate, Joi } = require('celebrate');

module.exports.cardIdValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.cardValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(http|https):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?)?$/),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().regex(/^(http|https):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?)?$/g),
  }),
});

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
