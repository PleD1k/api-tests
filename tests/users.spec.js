const axios = require("../utils/axios.config");
const endpoints = require("../utils/endpoints");
const testData = require("../test-data/users.data");

const Ajv = require("ajv"); //вот это подсматривал ибо не понял че это mail и date-time не пашет
const addFormats = require("ajv-formats");

const usersListSchema = require("../schemes/users-list.json");
const userSingleSchema = require("../schemes/user-single.json");
const userCreateSchema = require("../schemes/user-create.json");
const userUpdateSchema = require("../schemes/user-update.json");

const ajv = new Ajv();
addFormats(ajv);

describe("Users API", () => {
  beforeAll(() => {
    if (!process.env.BASE_URL) throw new Error("BASE_URL is not found");
  });

  test("GET users should return list of users", async () => {
    const validate = ajv.compile(usersListSchema);
    const response = await axios.get(endpoints.users.list);
    expect(response.status).toBe(200);
    expect(validate(response.data)).toBe(true);
  });

  test("GET users/7 should return specific user", async () => {
    const validate = ajv.compile(userSingleSchema);
    const response = await axios.get(endpoints.users.single(7));
    expect(response.status).toBe(200);
    const valid = validate(response.data);
    expect(valid).toBe(true);
    if (!valid) console.log(validate.errors);
    expect(response.data.data.id).toBe(7);
  });

  test("POST users should create a user", async () => {
    const validate = ajv.compile(userCreateSchema);
    const response = await axios.post(endpoints.users.create, testData.newUser);
    expect(response.status).toBe(201);
    const valid = validate(response.data);
    expect(valid).toBe(true);
    if (!valid) console.log(validate.errors);
    expect(response.data.name).toBe(testData.newUser.name);
    expect(response.data.job).toBe(testData.newUser.job);
  });

  test("PUT users/7 should update a user 7", async () => {
    const validate = ajv.compile(userUpdateSchema);
    const response = await axios.put(
      endpoints.users.update(7),
      testData.updatedUser
    );
    expect(response.status).toBe(200);
    const valid = validate(response.data);
    expect(valid).toBe(true);
    if (!valid) console.log(validate.errors);
    expect(response.data.name).toBe(testData.updatedUser.name);
    expect(response.data.job).toBe(testData.updatedUser.job);
  });

  test("DELETE users/7 should delete a user 7", async () => {
    const response = await axios.delete(endpoints.users.delete(7));
    expect(response.status).toBe(204);
  });
});
