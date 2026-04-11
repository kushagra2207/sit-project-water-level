import { Card } from "../common/Card";
import { formatPercentage } from "../../utils/formatters";

export function WaterLevelGauge({ percentage = 0 }) {
  const normalizedValue = Math.min(Math.max(Number(percentage || 0), 0), 100);

  return (
    <Card className="gauge-card">
      <div className="gauge-card__header">
        <p className="eyebrow">Current Capacity</p>
        <h3>Reservoir fill level</h3>
      </div>
      <div className="gauge-shell" aria-label="Water level gauge">
        <div className="gauge-fill" style={{ height: `${normalizedValue}%` }} />
        <div className="gauge-value">{formatPercentage(normalizedValue)}</div>
      </div>
      <p className="gauge-caption">The water body is currently operating at {formatPercentage(normalizedValue)} of total capacity.</p>
    </Card>
  );
}
