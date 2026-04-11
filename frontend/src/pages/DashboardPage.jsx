import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { PageShell } from "../components/common/PageShell";
import { SectionHeader } from "../components/common/SectionHeader";
import { HistoryTable } from "../components/dashboard/HistoryTable";
import { LatestReadingPanel } from "../components/dashboard/LatestReadingPanel";
import { QuickTips } from "../components/dashboard/QuickTips";
import { SummaryCard } from "../components/dashboard/SummaryCard";
import { WaterLevelGauge } from "../components/dashboard/WaterLevelGauge";
import { useAuth } from "../hooks/useAuth";
import { useWaterLevel } from "../hooks/useWaterLevel";
import { APP_NAME, ANOMALY_THRESHOLD } from "../utils/constants";
import { formatPercentage, formatWaterLevel } from "../utils/formatters";

function DashboardPage({ controllerId, onBack }) {
  const { user, logout } = useAuth();
  const { latestReading, history, insights, error, notice, isLoading, refreshData } = useWaterLevel(controllerId);

  const sidebar = (
    <div className="sidebar-card">
      <p className="eyebrow">Monitoring Console</p>
      <h1>{APP_NAME}</h1>
      <p className="sidebar-copy">
        Viewing data for controller <strong>{controllerId}</strong>. Use the back button to switch controllers.
      </p>

      <div className="sidebar-profile">
        <span className="panel-label">Signed in as</span>
        <strong>{user?.name || "Admin"}</strong>
        <small>{user?.username}</small>
      </div>

      <div className="sidebar-actions">
        <Button onClick={onBack} variant="secondary">← All controllers</Button>
        <Button onClick={refreshData}>Refresh data</Button>
        <Button onClick={logout} variant="ghost">
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <PageShell sidebar={sidebar}>
      <SectionHeader
        eyebrow={`Controller ${controllerId}`}
        title="Water level overview"
        description="Live readings and recent history for this controller."
      />

      {error ? (
        <EmptyState
          title="Unable to load dashboard data"
          description={error}
          onRetry={refreshData}
        />
      ) : null}

      {notice ? (
        <div className="card">
          <p className="eyebrow">Info</p>
          <h3>Dashboard is available</h3>
          <p className="section-description">{notice}</p>
        </div>
      ) : null}

      {insights.anomalyCount > 0 ? (
        <div className="anomaly-banner">
          <div className="anomaly-banner__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="anomaly-banner__body">
            <strong>Anomaly detected — Possible pipe burst</strong>
            <p>{insights.anomalyCount} {insights.anomalyCount === 1 ? "reading" : "readings"} showed a drop of {ANOMALY_THRESHOLD}%+ from the previous value. Check the history table below for flagged entries.</p>
          </div>
        </div>
      ) : null}

      <section className="summary-grid">
        <SummaryCard
          title="Latest water level"
          value={formatWaterLevel(latestReading?.water_level)}
          detail="Most recent sensor reading in litres"
          accent="water"
        />
        <SummaryCard
          title="Latest fill percentage"
          value={formatPercentage(latestReading?.percentage)}
          detail="Most recent reservoir capacity reading"
          accent="teal"
        />
        <SummaryCard
          title="Average of recent records"
          value={formatPercentage(insights.averagePercentage)}
          detail="Calculated from the latest fetched history"
          accent="sand"
        />
        <SummaryCard
          title="Stored records"
          value={String(insights.totalRecords || 0)}
          detail="Total records for this controller"
          accent="navy"
        />
      </section>

      <section className="dashboard-grid">
        <WaterLevelGauge percentage={latestReading?.percentage} />
        <LatestReadingPanel reading={latestReading} />
        <QuickTips />
      </section>

      <SectionHeader
        eyebrow="Recent History"
        title="Latest sensor entries"
        description={isLoading ? "Loading the newest readings from the backend..." : "Recent readings captured from this controller."}
      />

      <HistoryTable rows={history} anomalyIds={insights.anomalyIds} onRetry={refreshData} />
    </PageShell>
  );
}

export default DashboardPage;
