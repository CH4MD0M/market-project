const Banner = require('../models/BannerModel');

const getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({}).sort({ name: 'asc' }).orFail();
    res.json(banners);
  } catch (error) {
    next(error);
  }
};

module.exports = { getBanners };
