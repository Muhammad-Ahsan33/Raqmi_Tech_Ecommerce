const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const { sendResetPasswordEmail } = require('./emailService');

const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET,
    { expiresIn: '1d'}
  );
};

const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();
  return generateToken(user._id);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user._id);
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Error('No user found with that email');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiry;
  
  await user.save();

  await sendResetPasswordEmail(email, resetToken);
  return { message: 'Password reset email sent' };
};

const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }   // Check if token is still valid checks if the token expire time is greater than the current time
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  
  await user.save();
  return { message: 'Password reset successful' };
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  generateToken
};
