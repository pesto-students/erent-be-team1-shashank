const configs = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || 'development',

  dbURI: process.env.MONGO_URL,
  dbName: process.env.DB_NAME
};

export default configs;
