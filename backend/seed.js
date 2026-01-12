require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    // Check if an admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists. No action taken.');
      return;
    }

    // Ensure required environment variables are set
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin';

    if (!adminPassword) {
      console.error('Error: ADMIN_PASSWORD environment variable is not set.');
      console.log('Please set a secure password for the admin account.');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create the new admin user
    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Default admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log('Password: [Set from your ADMIN_PASSWORD environment variable]');

  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedAdmin();
    } catch (err) {
      console.error(err);
    } finally {
      mongoose.connection.close();
    }
  })();
}

module.exports = seedAdmin;
