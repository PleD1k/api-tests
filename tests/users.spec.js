const axios = require('../utils/axios.config');
const endpoints = require('../utils/endpoints');
const testData = require('../test-data/users.data');

describe('Users API', () => {
  beforeAll(() => {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL is not found');
    }
  });

  test('GET users should return list of users', async () => {
    const response = await axios.get(endpoints.users.list);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
    expect(response.data.data.length).toBeGreaterThan(0);

    const user = response.data.data[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
  });

  test('GET users/7 should return specific user', async () => {
    const response = await axios.get(endpoints.users.single(7));

    expect(response.status).toBe(200);
    expect(response.data.data).toHaveProperty('id', 7);
    expect(response.data.data).toHaveProperty('email');
    expect(response.data.data).toHaveProperty('first_name');
    expect(response.data.data).toHaveProperty('last_name');
  });

  test('POST users should create a user', async () => {
    const response = await axios.post(endpoints.users.create, testData.newUser);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(testData.newUser.name);
    expect(response.data.job).toBe(testData.newUser.job);
    expect(response.data).toHaveProperty('createdAt');
  });

  test('PUT users/7 should update a user 7', async () => {
    const response = await axios.put(endpoints.users.update(7), testData.updatedUser);

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(testData.updatedUser.name);
    expect(response.data.job).toBe(testData.updatedUser.job);
    expect(response.data).toHaveProperty('updatedAt');
  });

  test('DELETE users/7 should delete a user 7', async () => {
    const response = await axios.delete(endpoints.users.delete(7));

    expect(response.status).toBe(204);
  });
});
