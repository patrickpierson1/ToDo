const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  username: { type: String },
  email: { type: String, required: true, unique: true },                  
  password: { type: String },
  profilePic: { type: String },                             
  createdAt: { type: Date, default: Date.now }       
});

UserSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
  	this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
