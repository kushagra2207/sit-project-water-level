const express = require("express");
const WaterLevel = require("../models/WaterLevel");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/water-level — ESP32 sends data here
router.post("/", async (req, res) => {
  try {
    const { controller_id, water_level, percentage } = req.body;

    if (!controller_id) {
      return res.status(400).json({ message: "controller_id is required." });
    }
    if (water_level === undefined || water_level === null) {
      return res.status(400).json({ message: "water_level is required." });
    }
    if (percentage === undefined || percentage === null) {
      return res.status(400).json({ message: "percentage is required." });
    }

    const record = await WaterLevel.create({
      controller_id: String(controller_id),
      water_level: Number(water_level),
      percentage: Number(percentage),
    });

    res.status(201).json({
      message: "Water level recorded successfully.",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save water level.", error: error.message });
  }
});

// GET /api/water-level — Fetch all records (protected, for frontend)
router.get("/", async (req, res) => {
  try {
    const { limit = 100, page = 1, sort = "desc" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = sort === "asc" ? 1 : -1;

    const records = await WaterLevel.find()
      .sort({ timestamp: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const total = await WaterLevel.countDocuments();

    res.json({
      message: "Water level data fetched successfully.",
      data: records,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch water level data.", error: error.message });
  }
});

// GET /api/water-level/latest — Get the most recent reading
router.get("/latest", async (req, res) => {
  try {
    const latest = await WaterLevel.findOne().sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No water level data found." });
    }

    res.json({ message: "Latest water level fetched.", data: latest });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest reading.", error: error.message });
  }
});

module.exports = router;
