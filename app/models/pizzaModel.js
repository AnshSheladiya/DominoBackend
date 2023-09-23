const mongoose = require('mongoose');
const pizzaSchema = require('../schemas/pizzaSchema');
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza
