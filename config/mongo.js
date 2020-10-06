const mongoose = require("mongoose");

let MONGODB_URI = "";
if (process.env.NODE_ENV === "production") {
  MONGODB_URI = process.env.MONGODB_URI;
} else if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.MONGODB_URI_TEST;
} else if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.MONGODB_URI_DEV;
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    throw new Error("Error while connecting to mongoDB");
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to mongoDB");
});
