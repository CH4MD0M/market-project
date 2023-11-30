const User = require('../models/UserModel');

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
      res.status(201);
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

    // user가 존재하지 않을 경우를 처리합니다.
    if (!user) {
      return res.status(404).send('User not found');
    }

    // 비밀번호가 일치하지 않을 경우를 처리합니다.
    if (!comparePasswords(password, user.password)) {
      return res.status(401).send('Incorrect password');
    }

    const accessToken = generateAuthToken(
      user._id,
      user.name,
      user.email,
      user.isAdmin,
      doNotLogout
    );

    let cookieParams = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    if (doNotLogout) {
      cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
    }

    return res.cookie("access_token", accessToken, cookieParams).json({
      success: "user logged in",
      userInfo: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        doNotLogout,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
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

// Update user Name
const updateUserName = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;

    await user.save();

    const newAccessToken = generateAuthToken(
      user._id,
      user.name,
      user.email,
      user.isAdmin,
      req.body.doNotLogout
    );

    let cookieParams = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    return res.cookie("access_token", newAccessToken, cookieParams).json({
      success: "user updated",
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

// Update user address
const updateUserAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.address = req.body.address;
    user.zipCode = req.body.zipCode;
    await user.save();

    res.json({
      success: 'user updated',
      userUpdated: {
        _id: user._id,
        address: user.address,
        zipCode: user.zipCode,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update user phone
const updateUserPhone = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.phoneNumber = req.body.phoneNumber;
    await user.save();

    res.json({
      success: 'user updated',
      userUpdated: {
        _id: user._id,
        phoneNumber: user.phoneNumber,
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
  updateUserName,
  updateUserPhone,
  updateUserAddress,
  updateUserPassword,
  getUserProfile,
  getSingleUser,
  updateUser,
  deleteUser,
};
