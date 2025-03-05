const Ticket = require("../models/Ticket");
// Create Ticket
exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticket = new Ticket({
      title,
      description,
      createdBy: req.userId,
    });

    await ticket.save();

    // Populate the createdBy field with user details
    const populatedTicket = await Ticket.findById(ticket._id).populate(
      "createdBy",
      "username"
    );

    res.status(201).json(populatedTicket);
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
//get ticket by id
exports.getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id).populate(
      "createdBy",
      "username email"
    );
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// update tickets
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    // Find the ticket and check permissions
    const ticket = await Ticket.findById(id).populate(
      "createdBy",
      "username email"
    );
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Check if user is the creator OR an admin
    const isCreator = ticket.createdBy._id.toString() === req.userId;
    const isAdmin = req.role === "admin";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Update fields based on role
    if (isCreator) {
      // Regular users can update title/description
      ticket.title = title || ticket.title;
      ticket.description = description || ticket.description;
    }

    if (isAdmin) {
      // Admins can update status
      ticket.status = status || ticket.status;
    }

    // Save changes to the database
    const updatedTicket = await ticket.save();

    // Send email notification (admin actions only)
    if (isAdmin && status && ticket.createdBy.email) {
      const subject = "Your Ticket Status Has Been Updated";
      const text = `Your ticket "${ticket.title}" has been updated to "${ticket.status}".`;
    }

    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
