const checkReviewExists = async (product, userId) => {
  return product.reviews.find(r => r.user._id.toString() === userId.toString());
};

const recalculateProductRating = product => {
  if (product.reviews.length === 0) {
    product.rating = 0;
    product.reviewsNumber = 0;
  } else {
    const ratingCalc =
      product.reviews
        .map(item => Number(item.rating))
        .reduce((sum, item) => sum + item, 0) / product.reviews.length;
    product.rating = Math.round(ratingCalc);
    product.reviewsNumber = product.reviews.length;
  }
  return product;
};

module.exports = {
  checkReviewExists,
  recalculateProductRating,
};
