const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController");
const { resetPasswordController } = require('../controllers/authController');

const router = express.Router();

// Simulated session tracking with in-memory storage
const activeSessions = {};

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", (req, res) => {
  // Perform login logic
  // After successful login, create and store a session token
  const userId = "user123"; // Replace with actual user ID
  const sessionToken = "some_unique_token"; // Generate a session token
  if (!activeSessions[userId]) {
    activeSessions[userId] = [];
  }
  activeSessions[userId].push(sessionToken);

  // Send response
  res.status(200).json({ message: "Login successful", sessionToken });
});

// LOGOUT from ALL DEVICES
router.post("/logout-all-devices", (req, res) => {
  const { userId } = req.body;

  if (userId && activeSessions[userId]) {
    // Invalidate all sessions for the user
    activeSessions[userId] = [];

    res.status(200).json({ message: "Logged out from all devices" });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

// RESET PASSWORD
router.post("/reset-password", resetPasswordController);

module.exports = router;
