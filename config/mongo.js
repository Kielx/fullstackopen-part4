const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : process.env.MONGODB_URI_DEV,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => {
    throw new Error("Error while connecting to mongoDB");
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongoDB");
});
