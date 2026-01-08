const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/User');

// Configuration
const MONGO_URI = 'mongodb://127.0.0.1:27017/soil-farming-agent'; // Adjust if needed
const API_URL = 'http://localhost:5000/api/auth/register';

async function debugSystem() {
  console.log('🔍 Starting System Diagnostic...');

  // 1. Test Mongoose Model Directly
  try {
    console.log('\n1️⃣ Testing Mongoose Model...');
    await mongoose.connect(MONGO_URI);
    console.log('   ✅ Connected to MongoDB');

    const testEmail = `debug_model_${Date.now()}@test.com`;
    const testUser = new User({
      name: 'Model Test',
      email: testEmail,
      password: 'hashed_password_example', // Simulate hashed password
      role: 'user'
    });

    await testUser.save();
    console.log('   ✅ User Model Save Successful');
    
    // Cleanup
    await User.deleteOne({ email: testEmail });
    await mongoose.disconnect();
    console.log('   ✅ Cleanup Successful');

  } catch (error) {
    console.error('   ❌ Mongoose Model Test Failed:', error.message);
    if (error.errors) console.error('   validation errors:', JSON.stringify(error.errors, null, 2));
    return; // Stop if model is broken
  }

  // 2. Test Backend API
  try {
    console.log('\n2️⃣ Testing Backend API endpoint...');
    
    const apiTestEmail = `debug_api_${Date.now()}@test.com`;
    const payload = {
      name: 'API Test',
      email: apiTestEmail,
      password: 'password123',
      role: 'admin'
    };

    console.log('   Sending Payload:', payload);
    const response = await axios.post(API_URL, payload);
    
    console.log('   ✅ API Registration Successful!');
    console.log('   Status:', response.status);
    console.log('   Token received:', !!response.data.token);

  } catch (error) {
    console.error('   ❌ API Test Failed');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   ❌ Connection Refused. Is the backend server running on port 5000?');
    } else {
      console.error('   Error:', error.message);
    }
  }
}

debugSystem();
