const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
  name: String,
  age: Number,
  office: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;