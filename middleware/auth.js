// *NPM Packages
const jwt = require("jsonwebtoken");

// *Utils
const asyncHandler = require("./async");

// *Models
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.user) {
    // next();
  } else if (req.session.token) {
    token = req.session.token;
  }

  // Make sure token exists
  if (!token && req.user === null) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    if (req.user) {
      next();
    } else {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      req.user = await User.findById(decoded.id);

      next();
    }
  } catch (err) {
    console.log("Error", err);
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
});

// Check if user is verified
exports.verifiedUser = asyncHandler(async (req, res, next) => {
  try {
    if (req.user && req.user.verified === false) {
      return res
        .status(400)
        .json({ success: false, message: "Verification not done" });
    }

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Verification not done" });
  }
});
