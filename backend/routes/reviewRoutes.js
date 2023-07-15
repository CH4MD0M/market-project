const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn } = require('../middleware/verifyAuthToken');

const { writeReview } = require('../controllers/reviewController');

router.use(verifyIsLoggedIn);
router.post('/:productId', writeReview);

module.exports = router;
