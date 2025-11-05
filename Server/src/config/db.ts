import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGO_URI;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
  }

  console.log(`MONGODB_URI: ${MONGODB_URI}`);

  try {
    const conn = await mongoose.connect(MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
