const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: String,
  phoneNumber: String,
  address: String,
  dateOfBirth: Date,
  gender: String,
  profileImage: String,
  paymentMethods: [], 
  favoritePizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }], 
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], 

  meta: {
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    is_deleted: Boolean,
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdByIp: String,
    updatedByIp: String,
  },
});

module.exports = UserSchema
