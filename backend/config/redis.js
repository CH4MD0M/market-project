require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
  url: `${process.env.REDIS_URL}`,
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
