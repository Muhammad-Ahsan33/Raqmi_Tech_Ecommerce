import authService from '../services/auth-service.js';
import googleAuthService from '../services/google-auth-service.js';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await authService.registerUser(username, email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await googleAuthService.verifyGoogleToken(token);
    const authToken = await authService.generateToken(user._id);
    res.json({ token: authToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default  {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword
};
