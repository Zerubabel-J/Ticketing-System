const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/emailService");

exports.getAllUsers = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await User.find({}, { password: 0 }).skip(skip).limit(limit);

    // Get total number of users
    const totalUsers = await User.countDocuments();

    res.json({
      users,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    if (id !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update username if provided
    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure the user is deleting their own account
    if (id !== req.userId && req.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    // Ensure the requester is an admin
    if (req.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send email notification if notifications are enabled

    if (user.email && user.notifications) {
      const subject = "Your Role Has Been Updated";
      const text = `Your role has been changed to "${user.role}".`;

      await sendEmail(user.email, subject, text);
    }

    res.json({ message: "User role updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
