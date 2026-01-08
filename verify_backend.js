const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

async function testBackend() {
  console.log('Testing Backend Health...');
  const testUser = {
    name: 'Test Verify',
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
    role: 'admin'
  };

  try {
    // 1. Register
    console.log(`\nAttempting to Register user: ${testUser.email}`);
    const regRes = await axios.post(`${API_URL}/register`, testUser);
    console.log('✅ Registration Successful:', regRes.status, regRes.data);

    // 2. Login
    console.log(`\nAttempting to Login user: ${testUser.email}`);
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login Successful:', loginRes.status);
    console.log('Token received:', !!loginRes.data.token);

  } catch (error) {
    console.error('❌ Backend Test Failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testBackend();
