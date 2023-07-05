require('dotenv').config();
const redis = require('redis');

const REDIS_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_REDIS_URL
    : process.env.REDIS_URL;

const redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: true,
});
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', err => {
  console.log(`Something went wrong ${err}`);
});

redisClient.connect().then();

module.exports = redisClient;
