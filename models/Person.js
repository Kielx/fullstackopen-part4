const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  phone: String,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
