const config = {
  mongoUri: process.env.__MONGO_URI__ || '',
  mongoDb: process.env.__MONGO_DB_NAME__ || '',
  port: process.env.PORT,
};

export default config;
