const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  const { sub, email, name } = payload;

  // Find or create user
  let user = await User.findOne({ googleId: sub });

  if (!user) {
    user = new User({
      username: name,
      email,
      googleId: sub,
      password: null // No password for Google auth users
    });
    await user.save();
  }

  return user;
};

module.exports = { verifyGoogleToken };
