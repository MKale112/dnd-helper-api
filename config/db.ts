import mongoose from 'mongoose';
import config from 'config';

const db: string = config.get('mongoURI');

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(db);
    console.log('Connected to DB!');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default connectDB;
