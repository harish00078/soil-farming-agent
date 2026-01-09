const request = require('supertest');
const app = require('../app');
const Distributor = require('../models/Distributor');
const jwt = require('jsonwebtoken');

jest.mock('../models/Distributor');

describe('Distributor API Endpoints', () => {
  let token;
  let adminToken;

  beforeAll(() => {
    token = jwt.sign({ id: 'userId', role: 'user' }, process.env.JWT_SECRET || 'default_secret');
    adminToken = jwt.sign({ id: 'adminId', role: 'admin' }, process.env.JWT_SECRET || 'default_secret');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test GET all distributors
  describe('GET /api/distributors', () => {
    it('should fetch all distributors for an authenticated user', async () => {
      Distributor.find.mockResolvedValue([{ name: 'AgroCorp' }, { name: 'FarmSupply' }]);
      const res = await request(app)
        .get('/api/distributors')
        .set('x-auth-token', token);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(2);
    });
  });

  // Test POST new distributor
  describe('POST /api/distributors', () => {
    it('should not allow a regular user to create a distributor', async () => {
      const res = await request(app)
        .post('/api/distributors')
        .set('x-auth-token', token)
        .send({ name: 'New Distributor', location: 'CA' });
      
      expect(res.statusCode).toEqual(403);
    });

    it('should allow an admin to create a distributor', async () => {
      const newDistributor = { name: 'GreenFarms', location: 'NY', contact: '123-456', products: 'seeds, fertilizer' };
      Distributor.create.mockResolvedValue({ _id: 'someId', ...newDistributor, products: ['seeds', 'fertilizer'] });

      const res = await request(app)
        .post('/api/distributors')
        .set('x-auth-token', adminToken)
        .send(newDistributor);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.name).toBe('GreenFarms');
    });
  });

  // Test PUT (update) a distributor
  describe('PUT /api/distributors/:id', () => {
    it('should allow an admin to update a distributor', async () => {
      const updatedData = { location: 'FL' };
      Distributor.findByIdAndUpdate.mockResolvedValue({ _id: 'someId', ...updatedData });

      const res = await request(app)
        .put('/api/distributors/someId')
        .set('x-auth-token', adminToken)
        .send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body.location).toBe('FL');
    });
  });

  // Test DELETE a distributor
  describe('DELETE /api/distributors/:id', () => {
    it('should allow an admin to delete a distributor', async () => {
      Distributor.findByIdAndDelete.mockResolvedValue({ _id: 'someId' });
      
      const res = await request(app)
        .delete('/api/distributors/someId')
        .set('x-auth-token', adminToken);

      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toBe('Distributor deleted successfully');
    });
  });
});
