const User = require('../models/user');
const testUser = (req, res) => {
    res.json({ message: 'User route is working!' });
};


const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
};


module.exports = { testUser , getAllUsers};
