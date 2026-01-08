const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Mock User model
jest.mock('../models/User');
// Mock bcrypt
jest.mock('bcryptjs');

describe('Auth Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedPassword');
      
      const saveMock = jest.fn().mockResolvedValue({
        _id: 'dummyId',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      });
      
      User.prototype.save = saveMock;

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toEqual('User registered successfully');
      expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should fail if user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Existing User',
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.msg).toEqual('User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const mockUser = {
        _id: 'dummyId',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'user'
      };
      
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should fail with invalid credentials', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.msg).toEqual('Invalid credentials');
    });
  });
});