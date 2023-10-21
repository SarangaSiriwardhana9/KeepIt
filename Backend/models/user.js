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
  cardType: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expirationDate: {
    type: String,
  },
  cvv: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
