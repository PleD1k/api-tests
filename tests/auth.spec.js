const axios = require('../utils/axios.config');
const endpoints = require('../utils/endpoints');
const testData = require('../test-data/users.data');

describe('Auth API', () => {
  beforeAll(() => {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL is not found');
    }
  });

  test('POST register should register successfully', async () => {
    const response = await axios.post(endpoints.auth.register, testData.registerSuccess);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('token');
  });

  test('POST register should fail without password', async () => {
    try {
      await axios.post(endpoints.auth.register, testData.registerFail);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error', 'Missing password');
    }
  });

  test('POST login should login successfully', async () => {
    const response = await axios.post(endpoints.auth.login, testData.loginSuccess);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');
  });

  test('POST login should fail without password', async () => {
    try {
      await axios.post(endpoints.auth.login, testData.loginFail);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error', 'Missing password');
    }
  });
});
