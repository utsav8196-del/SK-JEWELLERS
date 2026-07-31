import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI not set. Running in development mode without database.');
      console.warn('To connect MongoDB, set MONGODB_URI in .env file.');
      return null;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      retryWrites: true,
      w: 'majority'
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Error: ${error.message}`);
    console.warn('Running in development mode. Database operations will fail until MongoDB is connected.');
    return null;
  }
};
