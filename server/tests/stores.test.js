const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/User');
const Store = require('../models/Store');

// Sample user data
const testOwner = {
  name: 'Store Owner',
  email: 'owner@example.com',
  password: 'password123',
  role: 'owner'
};

// Sample store data
const testStore = {
  name: 'Test Store',
  description: 'A test store for unit testing',
  address: '123 Test Street, Test City',
  phone: '123-456-7890',
  email: 'store@example.com',
  operatingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '10:00', close: '15:00' },
    sunday: { isClosed: true }
  }
};

// Clear data before tests
beforeAll(async () => {
  await User.deleteMany({});
  await Store.deleteMany({});
});

// Close database connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Stores API', () => {
  let token;
  let storeId;

  // Register owner and get token
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testOwner);
    
    token = res.body.token;
  });

  // Test store creation
  describe('POST /api/stores', () => {
    it('should create a new store when authenticated as owner', async () => {
      const res = await request(app)
        .post('/api/stores')
        .set('Authorization', `Bearer ${token}`)
        .send(testStore);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('name', testStore.name);
      expect(res.body.data).toHaveProperty('description', testStore.description);
      
      storeId = res.body.data._id;
    });

    it('should not allow creating multiple stores for one owner', async () => {
      const res = await request(app)
        .post('/api/stores')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...testStore,
          name: 'Second Store'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'The user has already created a store');
    });
  });

  // Test get all stores
  describe('GET /api/stores', () => {
    it('should get all stores', async () => {
      const res = await request(app)
        .get('/api/stores');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  // Test get single store
  describe('GET /api/stores/:id', () => {
    it('should get a single store by ID', async () => {
      const res = await request(app)
        .get(`/api/stores/${storeId}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('name', testStore.name);
      expect(res.body.data).toHaveProperty('description', testStore.description);
    });

    it('should return 404 for non-existent store ID', async () => {
      const res = await request(app)
        .get(`/api/stores/5f7d0f48b02b8a3a3c0a1234`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'Store not found');
    });
  });

  // Test update store
  describe('PUT /api/stores/:id', () => {
    it('should update a store when authenticated as owner', async () => {
      const res = await request(app)
        .put(`/api/stores/${storeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Store Name'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('name', 'Updated Store Name');
      expect(res.body.data).toHaveProperty('description', testStore.description);
    });
  });

  // Test delete store
  describe('DELETE /api/stores/:id', () => {
    it('should delete a store when authenticated as owner', async () => {
      const res = await request(app)
        .delete(`/api/stores/${storeId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(Object.keys(res.body.data).length).toBe(0);
    });
  });
});