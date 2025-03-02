const Ticket = require("../models/Ticket");
const { sendEmail } = require("../utils/emailService");

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
    console.log("User Role:", req.role); // Debugging
    console.log("User ID:", req.userId); // Debugging

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

// update tickets

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findById(id).populate(
      "createdBy",
      "username email"
    );
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Check if the user is the creator or an admin
    if (
      ticket.createdBy._id.toString() !== req.userId &&
      req.role !== "admin"
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Admins can update status
    if (req.role === "admin" && status) {
      ticket.status = status;
      await ticket.save();

      // Send email notification if notifications are enabled
      if (ticket.createdBy.email && ticket.createdBy.notifications) {
        const subject = "Your Ticket Status Has Been Updated";
        const text = `Your ticket "${ticket.title}" has been updated to "${ticket.status}".`;
        await sendEmail(ticket.createdBy.email, subject, text);
      }
    }

    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// backend/controllers/ticketController.js
exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Check if the user is the creator or an admin
    if (ticket.createdBy.toString() !== req.userId && req.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    await Ticket.findByIdAndDelete(id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
