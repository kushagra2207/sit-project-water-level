export const APP_NAME = "SIT Water Level Monitor";
export const APP_TAGLINE = "Smart reservoir visibility for timely action";
export const STORAGE_KEYS = {
  authToken: "sit_water_level_token",
  authUser: "sit_water_level_user",
};

export const LEVEL_LABELS = {
  safe: "Safe",
  warning: "Attention",
  critical: "Critical",
};

// Minimum percentage-point drop between two consecutive readings
// to flag as a possible pipe burst. Adjust this value as needed.
export const ANOMALY_THRESHOLD = 30;
