const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "You are not logged in. Please login!" });
    }

    // Decode JWT
    const decodedObj = jwt.verify(token, process.env.JWT_PASSWORD);
    console.log("Decoded Token:", decodedObj); // ✅ Log token

    const { _id } = decodedObj;
    if (!_id) {
      return res.status(400).json({ error: "Invalid token: User ID not found." });
    }

    // Find user by _id
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    req.user = user; // ✅ Attach user object
    console.log("Authenticated User:", req.user); // ✅ Log user data
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { userAuth };
