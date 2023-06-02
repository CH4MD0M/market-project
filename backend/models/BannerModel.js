const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, default: '/images/tablets-category.png' },
  link: { type: String },
});
bannerSchema.index({ name: 1 });

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;
