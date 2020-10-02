const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const fc = require("fast-check");
const mongoose = require("mongoose");
const Person = require("../models/Person");

beforeEach(async () => {
  dbUsers = [
    {
      name: "Arto Hellas",
      phone: "123 456 789",
    },
    { name: "Pawel Jablonicky", phone: "(123) 123 3456" },
  ];

  await Person.deleteMany({});
  await Person.insertMany(dbUsers);
});

afterAll(async () => {
  await Person.deleteMany({});
  mongoose.connection.close();
});

const basicCheck = async (response) => {
  expect(response.status).toBe(200);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(typeof response.body).toBe("object");
};

it("returns json array of persons", async (done) => {
  const response = await request.get("/api/persons");
  basicCheck(response);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
  done();
});

it("returns a single person", async (done) => {
  const firstPerson = await Person.findOne({ name: "Arto Hellas" });
  const response = await request.get(`/api/persons/${firstPerson._id}`);
  basicCheck(response);
  expect(response.body.hasOwnProperty("_id")).toBe(true);
  expect(response.body.hasOwnProperty("name")).toBe(true);
  expect(response.body.hasOwnProperty("phone")).toBe(true);
  done();
});

it("posts a single person", async (done) => {
  const response = await request.post("/api/persons/").send({
    name: "John Johnes",
    phone: "123 345 567",
  });
  expect(response.status).toBe(200);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(typeof response.body).toBe("object");
  expect(response.body.hasOwnProperty("_id")).toBe(true);
  expect(response.body.hasOwnProperty("name")).toBe(true);
  expect(response.body.hasOwnProperty("phone")).toBe(true);
  done();
});

it("throws errors with invalid input", async (done) => {
  const response = await request.post("/api/persons/").send({
    name: "",
    phone: "",
  });
  expect(response.status).toBe(400);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(typeof response.body).toBe("object");
  expect(response.body.hasOwnProperty("errorMessage")).toBe(true);
  // expect(response.body.errors).toEqual(
  //   expect.arrayContaining([
  //     expect.objectContaining({ name: "Username provided is invalid" }),
  //     expect.objectContaining({ phone: "Phone number provided is invalid" }),
  //   ])
  // );
  done();
});

it("throws returns 400 when username already exists", async (done) => {
  const response = await request.post("/api/persons/").send({
    name: "Arto Hellas",
    phone: "123 345 567",
  });
  expect(response.status).toBe(400);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  done();
});

it("deletes a single person", async (done) => {
  const firstPerson = await Person.findOne({ name: "Pawel Jablonicky" });
  const response = await request.delete(`/api/persons/${firstPerson._id}`);
  expect(response.status).toBe(200);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(typeof response.body).toBe("object");
  expect(response.body.hasOwnProperty("_id")).toBe(true);
  expect(response.body.hasOwnProperty("name")).toBe(true);
  expect(response.body.hasOwnProperty("phone")).toBe(true);
  done();
});

it("returns 404 when user is not found", async (done) => {
  const response = await request.get("/api/persons/abc-123-def-asf4asdf");
  expect(response.status).toBe(404);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(typeof response.body).toBe("object");
  done();
});

// it("/api/persons does not return 500 (with fast-check)", async () =>
//   await fc.assert(
//     fc.asyncProperty(
//       fc.record(
//         {
//           name: fc.string(),
//           phone: fc.string(),
//         },
//         { withDeletedKeys: true }
//       ),
//       async (payload) => {
//         const response = await request.post("/api/persons/").send(payload);
//         expect(response.status).not.toBe(500);
//       }
//     ),
//     { verbose: true, timeout: 100 }
//   ));
