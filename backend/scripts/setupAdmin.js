import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const setupAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@skjewellers.com',
      password: 'admin123', // Change this to a secure password
      name: 'SK Jewellers Admin',
      role: 'superadmin',
      permissions: ['all']
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change this password after first login!');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Setup failed:', error.message);
    process.exit(1);
  }
};

setupAdmin();
