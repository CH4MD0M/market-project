const Product = require('../models/ProductModel');
const recordsPerPage = require('../config/pagination');
const cloudinary = require('cloudinary').v2;

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;

    // Get Products by Price (filtering page)
    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }
    // Get Products by Rating (filtering page)
    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(',') } };
    }
    // Get Products by Category (search bar)
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || '';
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replace(/,/g, '/');
      let regEx = new RegExp('^' + a);
      categoryQueryCondition = { category: regEx };
    }

    // Get Products by Category (filtering page)
    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(',').map(item => {
        if (item) return new RegExp('^' + item);
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
    }

    // Get Products by Attributes (filtering page)
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      attrsQueryCondition = req.query.attrs.split(',').reduce((acc, item) => {
        if (item) {
          let a = item.split('-');
          let values = [...a];
          values.shift(); // removes first item
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          return acc;
        } else return acc;
      }, []);
      queryCondition = true;
    }

    // Pagination
    const pageNum = Number(req.query.pageNum) || 1;

    // Sort by name, price etc.
    let sort = {};
    const sortOption = req.query.sort || '';
    if (sortOption) {
      let sortOpt = sortOption.split('_');
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    // Get Products through Search Box
    const searchQuery = req.params.searchQuery || '';
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = { score: { $meta: 'textScore' } };
      sort = { score: { $meta: 'textScore' } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      maxPageNum: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

// Get Product by ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('reviews')
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Get Bestsellers
const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: '$category', doc_with_max_sales: { $first: '$$ROOT' } },
      },
      { $replaceWith: '$doc_with_max_sales' },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// *Admin
// Get All Products
const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      .select('name price category images');
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

// Delete Product
const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: 'product removed' });
  } catch (err) {
    next(err);
  }
};

// Create Product
const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const {
      name,
      description,
      count,
      price,
      category,
      attributesTable,
      images,
    } = req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map(item => {
        product.attrs.push(item);
      });
    }
    product.images = images;
    await product.save();

    res.json({
      message: 'product created',
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

// Update Product
const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;

    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map(item => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({
      message: 'product updated',
    });
  } catch (err) {
    next(err);
  }
};

// Upload Images
const adminUploadProductImage = async (req, res, next) => {
  try {
    let product = await Product.findById(req.query.productId).orFail(
      new Error('Product not found')
    );
    product.images.push(...req.body.imageData);
    await product.save();
    res.status(200).json({ message: 'Product image updated successfully.' });
  } catch (err) {
    if (err.message === 'Product not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
    next(err);
  }
  return;
};

// Delete Product Image
const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  const imageId = req.params.publicId;

  try {
    await cloudinary.uploader.destroy(imageId);
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath, publicId: imageId } } }
    ).orFail();
    return res.status(200).json({ success: true });
  } catch (er) {
    next(er);
  }
  return;
};

const deleteCloudinaryImage = async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    return res.status(200).json({ success: true });
  } catch (er) {
    next(er);
  }
  return;
};

module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUploadProductImage,
  adminDeleteProductImage,
  deleteCloudinaryImage,
};
