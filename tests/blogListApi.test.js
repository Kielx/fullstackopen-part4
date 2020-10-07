const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../config/app");
const Blog = require("../models/Blog");
// const fc = require("fast-check");
const request = supertest(app);
let dbBlogs = [];

beforeAll(async () => {
  dbBlogs = [
    {
      title: "New dawn",
      author: "Kielx",
      url: "http://newDawnBlog.com",
      likes: 500,
    },
    {
      title: "Big black cat",
      author: "Kielx",
      url: "http://BigBlackCat.edu",
      likes: 7,
    },
  ];

  await Blog.deleteMany({});
  await Blog.insertMany(dbBlogs);
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.connection.close();
});

const basicCheck = async (response) => {
  expect(response.status).toBe(200);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(typeof response.body).toBe("object");
};

describe("/api/blogs responds correctly to basic HTTP requests", () => {
  it("returns json array of blogs", async () => {
    const response = await request.get("/api/blogs");
    basicCheck(response);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "New dawn" }),
        expect.objectContaining({ likes: 7 }),
      ])
    );
  });

  it("successfully creates a new blog entry", async () => {
    const response = await request.post("/api/blogs").send({
      title: "New dawn2",
      author: "Kielx",
      url: "http://newDawn2Blog.com",
      likes: 200,
    });
    basicCheck(response);
    expect(Object.prototype.hasOwnProperty.call(response.body, "_id")).toBe(
      true
    );
  });

  it("returns proper array length after creating additional post with additional blog entry", async () => {
    const response = await request.get("/api/blogs");
    basicCheck(response);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "New dawn" }),
        expect.objectContaining({ likes: 7 }),
        expect.objectContaining({ url: "http://newDawn2Blog.com" }),
      ])
    );
  });

  it("Checks if 404 is returned when invalid api endpoint is provided", async () => {
    const response = await request.get("/api/blsaogs");
    expect(response.status).toBe(404);
  });
});
