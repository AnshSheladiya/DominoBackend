const mongoose = require('mongoose')
const UserSchema = require('../schemas/userModel')
const User = mongoose.model('User', UserSchema)

module.exports = User
