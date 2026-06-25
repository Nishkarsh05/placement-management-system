const jwt = require('jsonwebtoken');
const User = require('../model/user');

const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'placement_secret_key_123',
    { expiresIn: '7d' }
  );
};

const sendUserResponse = (res, user, statusCode) => {
  const token = createToken(user._id);

  res.status(statusCode).json({
    message: 'Success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
    },
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role ? role.toLowerCase() : 'student',
      department,
    });

    sendUserResponse(res, user, 201);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    sendUserResponse(res, user, 200);
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      department: req.user.department,
    },
  });
};

module.exports = {
  register,
  login,
  getMe,
};