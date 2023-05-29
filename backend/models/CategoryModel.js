const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, default: '/images/tablets-category.png' },
  attrs: [{ key: { type: String }, value: [{ type: String }] }],
});
categorySchema.index({ description: 1 });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
