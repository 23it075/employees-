const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  type: { type: String, required: true }, // e.g. full-time, part-time, contractor
  profilePic: { type: String }, // URL or filename of profile picture
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
