const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController");
const { resetPasswordController } = require('../controllers/authController');


const router = express.Router();

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// LOGOUT
router.post("/logout", logoutController);

// RESET PASSWORD
router.post("/reset-password", resetPasswordController);

module.exports = router;
