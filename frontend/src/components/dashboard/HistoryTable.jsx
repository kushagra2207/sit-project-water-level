import { Card } from "../common/Card";
import { EmptyState } from "../common/EmptyState";
import { StatusBadge } from "../common/StatusBadge";
import { formatDateTime, formatPercentage, formatWaterLevel, getLevelStatus } from "../../utils/formatters";

export function HistoryTable({ rows, onRetry }) {
  if (!rows.length) {
    return (
      <Card>
        <EmptyState
          title="No water level records yet"
          description="Once the controller starts sending readings, the recent history will appear here."
          onRetry={onRetry}
        />
      </Card>
    );
  }

  return (
    <Card className="history-card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Controller</th>
              <th>Water level</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => {
              const status = getLevelStatus(item.percentage);

              return (
                <tr key={item._id}>
                  <td>{item.controller_id}</td>
                  <td>{formatWaterLevel(item.water_level)}</td>
                  <td>{formatPercentage(item.percentage)}</td>
                  <td>
                    <StatusBadge label={status.label} tone={status.tone} />
                  </td>
                  <td>{formatDateTime(item.timestamp)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
