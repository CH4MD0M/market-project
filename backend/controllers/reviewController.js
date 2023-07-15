const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');

const {
  checkReviewExists,
  recalculateProductRating,
} = require('../utils/review-util');

// Write review
const writeReview = async (req, res, next) => {
  let session;
  try {
    session = await Review.startSession();

    // get comment, rating from req.body
    const { comment, rating } = req.body;
    // validate request
    if (!(comment && rating)) {
      return res.status(400).send('All inputs are required');
    }

    // Product Collection에 저장해야 하기 때문에 리뷰 id를 수동으로 생성함.
    const ObjectId = require('mongodb').ObjectId;
    let reviewId = ObjectId();

    session.startTransaction();
    await Review.create(
      [
        {
          _id: reviewId,
          comment: comment,
          rating: Number(rating),
          user: {
            _id: req.user._id,
            name: req.user.name,
          },
        },
      ],
      { session: session }
    );

    const product = await Product.findById(req.params.productId)
      .populate('reviews')
      .session(session);

    // 이미 리뷰를 작성했는지 확인
    const alreadyReviewed = await checkReviewExists(product, req.user._id);
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send('product already reviewed');
    }

    const userOrder = await Order.findOne({
      user: req.user._id,
      'cartItems.name': product.name,
    }).session(session);

    if (userOrder) {
      const item = userOrder.cartItems.find(item => item.name === product.name);
      item.isReviewed = true;
      await userOrder.save();
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      let ratingCalc =
        prc
          .map(item => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length;
      product.rating = Math.round(ratingCalc);
      product.reviewsNumber = product.reviews.length;
    }

    await product.save();

    await session.commitTransaction();
    session.endSession();
    res.send('review created');
  } catch (err) {
    await session.abortTransaction();
    next(err);
  }
};

module.exports = {
  writeReview,
};
