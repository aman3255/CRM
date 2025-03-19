const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user"); // Ensure you import the User model

const orderRouter = express.Router();

orderRouter.post("/order", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;

    // Find user by _id and increment points by 5
    const updatedUser = await User.findOneAndUpdate(
      { _id }, // Find user by _id
      { $inc: { points: 5 } }, // Increment points by 5
      { new: true } // Return updated user document
    );

    if (!updatedUser) {
      return res.status(403).json({ error: "User not found" });
    }

    res.json({
      message: "Order placed successfully! Points increased by 5.",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = orderRouter;
