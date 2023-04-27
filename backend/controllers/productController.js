const Product = require('../models/ProductModel');
const recordsPerPage = require('../config/pagination');

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
      let a = categoryName.replaceAll(',', '/');
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

    //pagination
    const pageNum = Number(req.query.pageNum) || 1;

    // sort by name, price etc.
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
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getProducts;
