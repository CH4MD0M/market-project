const jwt = require('jsonwebtoken');

const generateAuthToken = (_id, name, email, isAdmin, doNotLogout) => {
  return jwt.sign(
    { _id, name, email, isAdmin, doNotLogout },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7h',
    }
  );
};
module.exports = generateAuthToken;
