const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../config/app");
const Blog = require("../models/Blog");
const { ApiError } = require("../utils/errorHandlers");

const request = supertest(app);
let dbBlogs = [];

beforeEach(async () => {
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

describe("errorHandler works proprely", () => {
  it("ApiError class returns proper values when called", async () => {
    const err = new ApiError("Test message", "operational", {
      name: "invalid",
    });
    expect(err.message).toBe("Test message");
    expect(err.errorType).toBe("operational");
    expect(err.data.name).toBe("invalid");
  });

  it("Returns proper error when user tries to create already existing blog", async () => {
    const response = await request.post("/api/blogs").send({
      title: "New dawn",
      author: "Kielx",
      url: "http://newDawn2Blog.com",
      likes: 200,
    });
    expect(response.status).toBe(400);
    expect(response.body.errorType).toBe("operational");
  });

  it("Throws 400 error with invalid input", async () => {
    const response = await request.post("/api/blogs").send({
      abc: 200,
    });
    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body.errorMessage).toBeTruthy();
  });
});
