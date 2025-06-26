const axios = require('../utils/axios.config');
const endpoints = require('../utils/endpoints');

describe('Resources API', () => {
  beforeAll(() => {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL is not found');
    }
  });

  test('GET unknown should return list of resources', async () => {
    const response = await axios.get(endpoints.resources.list);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
    expect(response.data.data.length).toBeGreaterThan(0);
    const resource = response.data.data[0];
    expect(resource).toHaveProperty('id');
    expect(resource).toHaveProperty('name');
    expect(resource).toHaveProperty('year');
    expect(resource).toHaveProperty('color');
  });

  test('GET unknown/7 should return specific resource 7', async () => {
    const response = await axios.get(endpoints.resources.single(7));
    expect(response.status).toBe(200);
    expect(response.data.data).toHaveProperty('id', 7);
    expect(response.data.data).toHaveProperty('name');
    expect(response.data.data).toHaveProperty('year');
    expect(response.data.data).toHaveProperty('color');
    expect(typeof response.data.data.name).toBe('string');
    expect(typeof response.data.data.year).toBe('number');
    expect(typeof response.data.data.color).toBe('string');
  });
});
