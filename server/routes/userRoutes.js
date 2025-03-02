// backend/routes/userRoutes.js
const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id/role", authMiddleware, updateUserRole);
module.exports = router;
