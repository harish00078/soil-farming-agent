const request = require('supertest');
const app = require('../app');
const Soil = require('../models/Soil');
const jwt = require('jsonwebtoken');

jest.mock('../models/Soil');

describe('Soil API Endpoints', () => {
  let token;
  let adminToken;

  beforeAll(() => {
    token = jwt.sign({ id: 'userId', role: 'user' }, process.env.JWT_SECRET || 'default_secret');
    adminToken = jwt.sign({ id: 'adminId', role: 'admin' }, process.env.JWT_SECRET || 'default_secret');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test GET all soils
  describe('GET /api/soils', () => {
    it('should fetch all soils for an authenticated user', async () => {
      Soil.find.mockResolvedValue([{ name: 'Loam' }, { name: 'Clay' }]);
      const res = await request(app)
        .get('/api/soils')
        .set('x-auth-token', token);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(2);
      expect(Soil.find).toHaveBeenCalledTimes(1);
    });

    it('should return 401 if no token is provided', async () => {
        const res = await request(app).get('/api/soils');
        expect(res.statusCode).toEqual(401);
    });
  });

  // Test POST new soil
  describe('POST /api/soils', () => {
    it('should not allow a regular user to create a soil', async () => {
        const res = await request(app)
            .post('/api/soils')
            .set('x-auth-token', token)
            .send({ name: 'New Soil', description: 'Desc', phLevel: '7' });
        
        expect(res.statusCode).toEqual(403); // Forbidden
    });

    it('should allow an admin to create a soil', async () => {
        const newSoil = { name: 'Sandy', description: 'Gritty', phLevel: '6.5', crops: 'carrots, potatoes' };
        
        // Mock the create method on the Soil model
        Soil.create.mockResolvedValue({ _id: 'someId', ...newSoil, crops: ['carrots', 'potatoes'] });

        const res = await request(app)
            .post('/api/soils')
            .set('x-auth-token', adminToken)
            .send(newSoil);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Sandy');
        expect(Soil.create).toHaveBeenCalledWith({
            ...newSoil,
            crops: ['carrots', 'potatoes']
        });
    });
  });

  // Test PUT (update) a soil
  describe('PUT /api/soils/:id', () => {
    it('should not allow a regular user to update a soil', async () => {
        const res = await request(app)
            .put('/api/soils/someId')
            .set('x-auth-token', token)
            .send({ description: 'Updated Desc' });
        
        expect(res.statusCode).toEqual(403);
    });

    it('should allow an admin to update a soil', async () => {
        const updatedData = { name: 'Updated Loam' };
        Soil.findByIdAndUpdate.mockResolvedValue({ _id: 'someId', ...updatedData });

        const res = await request(app)
            .put('/api/soils/someId')
            .set('x-auth-token', adminToken)
            .send(updatedData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('Updated Loam');
    });
  });

  // Test DELETE a soil
  describe('DELETE /api/soils/:id', () => {
    it('should not allow a regular user to delete a soil', async () => {
        const res = await request(app)
            .delete('/api/soils/someId')
            .set('x-auth-token', token);
        
        expect(res.statusCode).toEqual(403);
    });

    it('should allow an admin to delete a soil', async () => {
        Soil.findByIdAndDelete.mockResolvedValue({ _id: 'someId' });
        const res = await request(app)
            .delete('/api/soils/someId')
            .set('x-auth-token', adminToken);

        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toBe('Soil deleted successfully');
    });
  });
});
