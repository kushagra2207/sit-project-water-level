export function formatDateTime(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatPercentage(value) {
  const numericValue = Number(value ?? 0);
  return `${numericValue.toFixed(0)}%`;
}

export function formatWaterLevel(value) {
  const numericValue = Number(value ?? 0);
  return `${numericValue.toFixed(2)} L`;
}

export function getLevelStatus(percentage) {
  const numericValue = Number(percentage ?? 0);

  if (numericValue >= 80) {
    return { tone: "safe", label: "Safe" };
  }

  if (numericValue >= 20) {
    return { tone: "warning", label: "Attention" };
  }

  return { tone: "critical", label: "Critical" };
}
