const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  nicCardNo: {
    type: String,
  },
  province: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  cardHolderName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  cardType: {
    type: String,
  },
  cardExpirationDate: {
    type: String,
  },
  cvvNumber: {
    type: String,
  },
  profileCompletion: {
    type: Boolean,
  
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
