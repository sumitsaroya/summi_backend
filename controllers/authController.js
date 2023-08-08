const userModel = require("../models/userModel");
const errorResponse = require("../utils/errroResponse");

// JWT TOKEN
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// REGISTER
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Existing user
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid credentials", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid credentials", 401));
    }
    // Response
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

// RESET PASSWORD
exports.resetPasswordController = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return next(new errorResponse("User not found", 404));
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
