import { Card } from "../common/Card";
import { StatusBadge } from "../common/StatusBadge";
import { formatDateTime, formatPercentage, formatWaterLevel, getLevelStatus } from "../../utils/formatters";

export function LatestReadingPanel({ reading }) {
  const status = getLevelStatus(reading?.percentage);

  return (
    <Card className="latest-panel">
      <div className="latest-panel__header">
        <div>
          <p className="eyebrow">Latest Reading</p>
          <h3>Newest water level update</h3>
        </div>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="latest-panel__metrics">
        <div>
          <span className="metric-label">Controller</span>
          <strong>{reading?.controller_id || "Not available"}</strong>
        </div>
        <div>
          <span className="metric-label">Level</span>
          <strong>{formatWaterLevel(reading?.water_level)}</strong>
        </div>
        <div>
          <span className="metric-label">Filled</span>
          <strong>{formatPercentage(reading?.percentage)}</strong>
        </div>
        <div>
          <span className="metric-label">Captured</span>
          <strong>{formatDateTime(reading?.timestamp)}</strong>
        </div>
      </div>
    </Card>
  );
}
