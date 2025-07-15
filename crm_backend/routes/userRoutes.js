const express = require('express');
const router = express.Router();

const { testUser, getAllUsers } = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const User = require('../models/user'); // ✅ Add this line

// Test route (optional)
router.get('/test', testUser);

// Admin: Get all users
router.get('/', protect, adminOnly, getAllUsers);

// Admin: Change user role
router.put('/:id/role', protect, adminOnly, async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.status(200).json({ message: 'Role updated', user });
});

module.exports = router;
