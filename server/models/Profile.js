// models/Profile.js
const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  serviceType: { type: String, required: true },
  area: { type: String, required: true },
  whatsapp: { type: String, required: true },
  photo: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
