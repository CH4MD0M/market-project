const User = require('../models/UserModel');
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');

const { hashPassword, comparePasswords } = require('../utils/hashPassword');
const generateAuthToken = require('../utils/generateAuthToken');

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

// Register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send('All inputs are required');
    }

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('user exists');
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      res
        .cookie(
          'access_token',
          generateAuthToken(user._id, user.name, user.email, user.isAdmin),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          }
        )
        .status(201)
        .json({
          success: 'User created',
          userCreated: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

// Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send('All inputs are required');
    }

    const user = await User.findOne({ email }).orFail();
    if (user && comparePasswords(password, user.password)) {
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      };

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
      }

      return res
        .cookie(
          'access_token',
          generateAuthToken(user._id, user.name, user.email, user.isAdmin),
          cookieParams
        )
        .json({
          success: 'user logged in',
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send('wrong credentials');
    }
  } catch (err) {
    next(err);
  }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: 'user updated',
      userUpdated: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get user profile
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

// Write review
const writeReview = async (req, res, next) => {
  try {
    const session = await Review.startSession();

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
    const alreadyReviewed = product.reviews.find(
      r => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send('product already reviewed');
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      let ratingCalc =
        prc
          .map(item => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length;
      product.rating = Math.round(ratingCalc);
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

const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name email isAdmin')
      .orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    await user.save();

    res.send('user updated');
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    await user.remove();
    res.send('user removed');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getSingleUser,
  updateUser,
  deleteUser,
};
