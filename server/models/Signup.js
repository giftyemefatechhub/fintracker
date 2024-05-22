const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword: String,
  isActive: { type: Boolean, default: true }
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
