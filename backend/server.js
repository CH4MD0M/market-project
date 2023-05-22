const express = require('express');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8933;

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const apiRoutes = require('./routes/apiRoutes');

app.get('/', async (req, res, next) => {
  res.json({ message: 'API running...' });
});

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SEC,
  secure: true,
});

// mongodb connection
const connectDB = require('./config/db');
connectDB();

app.use('/api', apiRoutes);

// Error handling
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
