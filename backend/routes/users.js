const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');
const { userIdValidation, updateAvatarValidation, updateUserInfoValidation } = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', userIdValidation, getUser);

router.patch('/me', updateUserInfoValidation, updateUser);

router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
