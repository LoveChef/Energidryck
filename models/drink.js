// models/drink.js
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  title: String,
  image: String,
  info: String,
  flavor: String
});

module.exports = mongoose.model('Drink', drinkSchema);
