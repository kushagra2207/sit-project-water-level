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
import { APP_NAME } from "../utils/constants";
import { formatPercentage } from "../utils/formatters";

function DashboardPage() {
  const { user, logout } = useAuth();
  const { latestReading, history, insights, error, notice, isLoading, refreshData } = useWaterLevel();

  const sidebar = (
    <div className="sidebar-card">
      <p className="eyebrow">Monitoring Console</p>
      <h1>{APP_NAME}</h1>
      <p className="sidebar-copy">
        Follow the latest water level activity, review recent readings, and keep your controller data in one place.
      </p>

      <div className="sidebar-profile">
        <span className="panel-label">Signed in as</span>
        <strong>{user?.name || "Admin"}</strong>
        <small>{user?.username}</small>
      </div>

      <div className="sidebar-actions">
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
        eyebrow="Dashboard"
        title="Water level overview"
        description="A simple frontend structure that keeps UI, state, and backend connectors separated for easier future development."
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

      <section className="summary-grid">
        <SummaryCard
          title="Latest fill percentage"
          value={formatPercentage(latestReading?.percentage)}
          detail="Most recent reservoir capacity reading"
          accent="water"
        />
        <SummaryCard
          title="Average of recent records"
          value={formatPercentage(insights.averagePercentage)}
          detail="Calculated from the latest fetched history"
          accent="teal"
        />
        <SummaryCard
          title="Connected controllers"
          value={String(insights.activeControllers || 0)}
          detail="Unique controller IDs in the recent history list"
          accent="sand"
        />
        <SummaryCard
          title="Stored records"
          value={String(insights.totalRecords || 0)}
          detail="Total records reported by the backend pagination"
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
        description={isLoading ? "Loading the newest readings from the backend..." : "Recent readings captured from your controller data source."}
      />

      <HistoryTable rows={history} onRetry={refreshData} />
    </PageShell>
  );
}

export default DashboardPage;
