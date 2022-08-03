import mongoose from 'mongoose';

import configs from './index';

const { dbURI, dbName } = configs;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {
      dbName
    });
    console.log(
      `Database connection: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    throw Error(`Database connection Error: ${error.message}`);
  }
};
export default connectDB;
