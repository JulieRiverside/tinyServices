//server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['provider', 'user'], default: 'provider' } // <-- ADD THIS
});

module.exports = mongoose.model('User', UserSchema);
