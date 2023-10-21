const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'jbdysjRtY';

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, mobileNo, nicCardNo, province, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({
      fullName,
      mobileNo,
      nicCardNo,
      province,
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    // Send the complete user details in the response
    res.status(200).json({
      message: 'Login successful',
      user: {
        fullName: user.fullName,
        email: user.email,
        mobileNo: user.mobileNo,
        nicCardNo: user.nicCardNo,
        province: user.province,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Retrieve user data by email
router.get('/get-user-by-email', async (req, res) => {
  try {
    const { email } = req.query; // Assuming you're passing the email as a query parameter
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Return the user's data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update user data by email
router.put('/update-user', async (req, res) => {
  try {
    const { email } = req.query; // Assuming you're passing the email as a query parameter
    const updatedData = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Update the user's data
    for (const key in updatedData) {
      if (Object.hasOwnProperty.call(updatedData, key)) {
        user[key] = updatedData[key];
      }
    }

    // Save the updated user to the database
    await user.save();
    
    // Return the updated user's data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update user payment details by email
router.put('/update-payment-details', async (req, res) => {
  try {
    const { email } = req.query; // Assuming you're passing the email as a query parameter
    const updatedPaymentData = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's payment details
    for (const key in updatedPaymentData) {
      if (Object.hasOwnProperty.call(updatedPaymentData, key)) {
        user[key] = updatedPaymentData[key];
      }
    }

    // Save the updated user to the database
    await user.save();

    // Return the updated user's data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;

