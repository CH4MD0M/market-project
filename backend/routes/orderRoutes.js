const express = require('express');
const router = express.Router();

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require('../middleware/verifyAuthToken');

const {
  getUserOrders,
  getOrderDetails,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAdminOrders,
  getOrderForAnalysis,
} = require('../controllers/orderController');

// User(Logged in) routes
router.use(verifyIsLoggedIn);
router.get('/', getUserOrders);
router.get('/user/:id', getOrderDetails);
router.post('/', createOrder);
router.put('/paid/:id', updateOrderToPaid);

// Admin routes
router.use(verifyIsAdmin);
router.put('/delivered/:id', updateOrderToDelivered);
router.get('/admin', getAdminOrders);
router.get('/analysis/:date', getOrderForAnalysis);

module.exports = router;
