// local config
require("dotenv").config();

// express server
const express = require("express");

const app = express();

// cors
const cors = require("cors");

app.use(cors());

// bodyparser
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// logger
const morgan = require("morgan");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

//  errorHandler
const errorHandlers = require("../utils/errorHandlers");

// mongoDB
require("./mongo");

// static folder
// app.use(express.static("build"));

// routers
const blogApiRouter = require("../router/blogApi");
const usersRouter = require("../router/usersRouter");

app.use("/api/blogs", blogApiRouter);
app.use("/api/users", usersRouter);

app.get("*", (req, res) => {
  res.status(404).send({ errorMessage: "Requested resource was not found" });
});

// errorhandler
app.use(errorHandlers.errorHandler);

module.exports = app;
