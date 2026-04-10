const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: "admin", username: process.env.ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful.",
      token,
      user: { id: "admin", name: "Admin", username: process.env.ADMIN_USERNAME },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
});

// GET /api/auth/me — get current user (protected)
router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.id !== "admin") {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.json({ 
      user: { id: "admin", name: "Admin", username: process.env.ADMIN_USERNAME }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user.", error: error.message });
  }
});

module.exports = router;
