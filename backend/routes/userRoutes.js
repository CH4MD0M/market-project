const express = require('express');
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require('../middleware/verifyAuthToken');

const {
  getAllUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// User(Logged in) routes
router.use(verifyIsLoggedIn);
router.put('/profile', updateUserProfile);
router.get('/profile/:id', getUserProfile);
router.post('/review/:productId', writeReview);

// Admin routes
router.use(verifyIsAdmin);
router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
