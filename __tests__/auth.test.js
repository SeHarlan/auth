require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test user2', password: 'testPassword2' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test user2',
          __v: 0
        });
      });
  });

  it('logs in a user', async() => {
    await User.create({ username: 'test3', password: 'secure' });
    
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'test3', password: 'secure' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test3',
          __v: 0
        });
      });
  });

  it('fails to logs in a user', async() => {
    await User.create({ username: 'test3', password: 'secure' });
    
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'test3', password: 'baddddd' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid username or password',
          status: 403
        });
      });
  });

});
