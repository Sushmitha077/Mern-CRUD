import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Create user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update user

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});


export default router;
