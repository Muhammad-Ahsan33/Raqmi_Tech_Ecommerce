import User from'../models/userModel.js';
const bcrypt = require('bcryptjs');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -tokens');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const updates = req.body;
  const allowedUpdates = ['profile.firstName', 'profile.lastName', 'profile.phoneNumber', 'profile.address'];

  try {
    const user = await User.findById(req.user._id);

    allowedUpdates.forEach(update => {
      const keys = update.split('.');
      if (keys.length === 2) {
        user[keys[0]][keys[1]] = updates[update];
      }
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Password change failed', error: error.message });
  }
};


export default {
  changePassword,
  updateUserProfile,
  getUserProfile
}