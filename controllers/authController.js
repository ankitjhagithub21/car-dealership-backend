const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user")
const Dealership = require("../models/dealership")


const { generateToken } = require('../utils/auth');


exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  let Model;
  switch (role) {
    case 'admin':
      Model = Admin;
      break;
    case 'user':
      Model = User;
      break;
    case 'dealership':
      Model = Dealership;
      break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  let Model;
  switch (role) {
    case 'admin':
      Model = Admin;
      break;
    case 'user':
      Model = User;
      break;
    case 'dealership':
      Model = Dealership;
      break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Check if the user already exists
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Model({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.logout = async (req, res) => {
  // Clear user's session or perform any necessary cleanup
  res.json({ message: 'Logged out successfully' });
};

exports.changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword, role } = req.body;
  let Model;
  switch (role) {
    case 'admin':
      Model = Admin;
      break;
    case 'user':
      Model = User;
      break;
    case 'dealership':
      Model = Dealership;
      break;
    default:
      return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
