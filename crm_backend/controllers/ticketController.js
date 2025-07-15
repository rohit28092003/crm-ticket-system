const Ticket = require('../models/Ticket');

const getTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.json(tickets);
};

const getTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket || ticket.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  res.json(ticket);
};


const createTicket = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description required' });
  }

  const ticket = await Ticket.create({
    title,
    description,
    user: req.user.id, // ✅ this is needed
  });

  res.status(201).json(ticket);
};


const updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket || ticket.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json(updated);
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket || ticket.user.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  await ticket.remove();
  res.json({ message: 'Ticket deleted' });
};
const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find().populate('user', 'name email');
  res.status(200).json(tickets);
};

module.exports = {
  getTickets,
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket
};
