const mongoose = require("mongoose");

const waterLevelSchema = new mongoose.Schema(
  {
    controller_id: {
      type: String,
      required: [true, "Controller ID is required"],
    },
    water_level: {
      type: Number,
      required: [true, "Water level is required"],
    },
    percentage: {
      type: Number,
      required: [true, "Percentage is required"],
      min: 0,
      max: 100,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  { collection: "water_levels" }
);

module.exports = mongoose.model("WaterLevel", waterLevelSchema);
