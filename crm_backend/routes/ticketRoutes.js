const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getAllTickets
} = require('../controllers/ticketController');


router.route('/')
  .post(protect, createTicket)
  .get(protect, getTickets);

router.route('/:id')
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

// ✅ Admin-only route
router.get('/admin/all', protect, adminOnly, getAllTickets);

module.exports = router;
