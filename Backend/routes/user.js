const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const requiredProfileFields = ['fullName', 'mobileNo', 'nicCardNo', 'province', 'email', 'address', 'birthDate', 'profilePicture', 'cardHolderName', 'cardNumber', 'cardType', 'cardExpirationDate', 'cvvNumber'];
function isProfileComplete(user) {
  for (const field of requiredProfileFields) {
    if (!user[field] || user[field] === null) {
      return false;
    }
  }
  return true;
}

router.post('/register', async (req, res) => {
  try {
    const { fullName, mobileNo, nicCardNo, province, email, password,address,birthDate,profilePicture,cardHolderName,cardNumber,cardType,cardExpirationDate ,cvvNumber,profileCompletion} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      mobileNo,
      nicCardNo,
      province,
      email,
      password: hashedPassword,
      address,
      birthDate,
      profilePicture,
      cardHolderName,
      cardNumber,
      cardType,
      cardExpirationDate,
      cvvNumber,
      profileCompletion: false,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.status(200).json({
      message: 'Login successful',
      user: {
        fullName: user.fullName,
        email: user.email,
        mobileNo: user.mobileNo,
        nicCardNo: user.nicCardNo,
        province: user.province,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-user-by-email', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update user data by email

router.put('/update-user', async (req, res) => {
  try {
    const { email } = req.query;
    const updatedData = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    for (const key in updatedData) {
      if (Object.hasOwnProperty.call(updatedData, key)) {
        user[key] = updatedData[key];
      }
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update payment data by email

router.put('/update-payment', async (req, res) => {
  try {
    const { email } = req.query;
    const updatedPaymentData = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    for (const key in updatedPaymentData) {
      if (Object.hasOwnProperty.call(updatedPaymentData, key)) {
        user[key] = updatedPaymentData[key];
      }
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// get profile completion status by email
router.get('/get-profile-completion', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const isComplete = isProfileComplete(user);
    user.profileCompletion = isComplete;
    res.status(200).json({ profileCompletion: user.profileCompletion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-user-by-email', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({
      _id: user._id, // Include the _id field in the response
      email: user.email,
      // Include other user fields as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// get user by id
router.get('/get-seller-by-id/:id', getSellerById, (req, res) => {
  res.json(res.seller);
});

// Middleware to retrieve seller by _id
async function getSellerById(req, res, next) {
  const { id } = req.params;
  try {
    const seller = await User.findById(id);

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.seller = seller;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
