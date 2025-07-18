const axios = require("../utils/axios.config");
const endpoints = require("../utils/endpoints");
const Ajv = require("ajv");
const resourcesListSchema = require("../schemes/resources-list.json");
const resourceSingleSchema = require("../schemes/resource-single.json");

const ajv = new Ajv();

describe("Resources API", () => {
  beforeAll(() => {
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not found");
    }
  });

  test("GET unknown should return list of resources", async () => {
    const validate = ajv.compile(resourcesListSchema);
    const response = await axios.get(endpoints.resources.list);
    expect(response.status).toBe(200);
    const valid = validate(response.data);
    expect(valid).toBe(true);
    if (!valid) console.log(validate.errors);
  });

  test("GET unknown/7 should return specific resource 7", async () => {
    const validate = ajv.compile(resourceSingleSchema);
    const response = await axios.get(endpoints.resources.single(7));
    expect(response.status).toBe(200);
    const valid = validate(response.data);
    expect(valid).toBe(true);
    if (!valid) console.log(validate.errors);
    expect(response.data.data.id).toBe(7);
  });
});
