const express = require('express');
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require('../middleware/verifyAuthToken');

const {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// User(Logged in) routes
router.use(verifyIsLoggedIn);
router.put('/profile', updateUserProfile);
router.get('/profile/:id', getUserProfile);

// Admin routes
router.use(verifyIsAdmin);
router.get('/', getUsers);

module.exports = router;
