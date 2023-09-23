const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // Price related fields
  price: {
    type: Number,
  },
  sale_price: {
    type: Number,
  },
  currency: {
    type: String,
  },

  ingredients: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  isGlutenFree: {
    type: Boolean,
    default: false,
  },
  sizes: {
    type: [String],
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  spiciness: {
    type: Number,
    default: 1,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  meta: {
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_deleted: Boolean,
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdByIp: String,
    updatedByIp: String,
  },
});

module.exports = pizzaSchema;
