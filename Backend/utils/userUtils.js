// userUtils.js

const User = require('../models/user');

// A function to update the profileCompletion status for a user
const updateProfileCompletionStatus = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    // Handle user not found
    return;
  }

  // Check if all required fields are not null
  if (
    user.fullName !== null &&
    user.mobileNo !== null &&
    user.nicCardNo !== null &&
    user.province !== null &&
    user.address !== null &&
    user.birthDate !== null &&
    user.profilePicture !== null &&
    user.cardHolderName !== null &&
    user.cardNumber !== null &&
    user.cardType !== null &&
    user.cardExpirationDate !== null &&
    user.cvvNumber !== null
  ) {
    user.profileCompletion = true;
  } else {
    user.profileCompletion = false;
  }

  // Save the updated user to the database
  await user.save();
};

module.exports = { updateProfileCompletionStatus };
