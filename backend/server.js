const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const waterLevelRoutes = require("./routes/waterLevel");

const app = express();
const PORT = process.env.PORT || 5000;
const REQUIRED_ENV_VARS = [
  "JWT_SECRET",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
];

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/water-level", waterLevelRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Water Monitor API is running." });
});

function validateEnvironment() {
  const missingVariables = REQUIRED_ENV_VARS.filter(
    (variableName) => !process.env[variableName]
  );

  if (!missingVariables.length) {
    return true;
  }

  console.error(
    "Missing required environment variables:",
    missingVariables.join(", ")
  );
  console.error(
    "Create backend/.env using backend/.env.example and restart the server."
  );

  return false;
}

async function startServer() {
  if (!validateEnvironment()) {
    process.exit(1);
  }

  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.warn("MongoDB connection skipped:", error.message);
      console.warn("Login will still work, but water level data APIs will be unavailable.");
    }
  } else {
    console.warn("MONGODB_URI is not set.");
    console.warn("Login will still work, but water level data APIs will be unavailable.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
