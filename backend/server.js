require('dotenv').config();

const { createServer } = require('http');
const { Server } = require('socket.io');
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

const httpServer = createServer(app);
global.io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.CLIENT_URL,
  },
});

const whitelist = ['http://localhost:3000', process.env.CLIENT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const apiRoutes = require('./routes/apiRoutes');

// cloudinary config
const cloudinary = require('cloudinary').v2;

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

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'API running...' });
  });
}

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

const PORT = process.env.PORT || 8933;

httpServer.listen(PORT, console.log(`Server running on port ${PORT}!`));
