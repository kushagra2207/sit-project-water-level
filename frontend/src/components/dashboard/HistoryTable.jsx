import { Card } from "../common/Card";
import { EmptyState } from "../common/EmptyState";
import { StatusBadge } from "../common/StatusBadge";
import { formatDateTime, formatPercentage, formatWaterLevel, getLevelStatus } from "../../utils/formatters";

export function HistoryTable({ rows, anomalyIds, onRetry }) {
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
              const isAnomaly = anomalyIds?.has(item._id);

              return (
                <>
                  <tr key={item._id} className={isAnomaly ? "anomaly-row" : ""}>
                    <td>{item.controller_id}</td>
                    <td>{formatWaterLevel(item.water_level)}</td>
                    <td>{formatPercentage(item.percentage)}</td>
                    <td>
                      <StatusBadge label={status.label} tone={status.tone} />
                    </td>
                    <td>{formatDateTime(item.timestamp)}</td>
                  </tr>
                  {isAnomaly ? (
                    <tr key={`${item._id}-alert`} className="anomaly-alert-row">
                      <td colSpan="5">
                        <div className="anomaly-inline-alert">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                          <span>Possible pipe burst — sudden drop detected from previous reading</span>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
