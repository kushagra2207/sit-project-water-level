const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const waterLevelRoutes = require("./routes/waterLevel");

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/water-level", waterLevelRoutes);

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Water Monitor API is running 🚀" });
});

// ── Connect to MongoDB & start server ──
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
