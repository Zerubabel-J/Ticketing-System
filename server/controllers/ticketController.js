const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticket = new Ticket({ title, description, createdBy: req.userId });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets =
      req.role === "admin"
        ? await Ticket.find().populate("createdBy", "username")
        : await Ticket.find({ createdBy: req.userId }).populate(
            "createdBy",
            "username"
          );
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Ticket
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
