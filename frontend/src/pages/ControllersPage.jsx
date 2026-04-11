import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { PageShell } from "../components/common/PageShell";
import { SectionHeader } from "../components/common/SectionHeader";
import { useAuth } from "../hooks/useAuth";
import { useControllers } from "../hooks/useControllers";
import { APP_NAME } from "../utils/constants";

function ControllersPage({ onSelectController }) {
  const { user, logout } = useAuth();
  const { controllerIds, isLoading, error, notice, refreshControllers } = useControllers();

  const sidebar = (
    <div className="sidebar-card">
      <p className="eyebrow">Monitoring Console</p>
      <h1>{APP_NAME}</h1>
      <p className="sidebar-copy">
        Select a controller below to view its water level readings, history, and live gauge.
      </p>

      <div className="sidebar-profile">
        <span className="panel-label">Signed in as</span>
        <strong>{user?.name || "Admin"}</strong>
        <small>{user?.username}</small>
      </div>

      <div className="sidebar-actions">
        <Button onClick={refreshControllers}>Refresh list</Button>
        <Button onClick={logout} variant="ghost">
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <PageShell sidebar={sidebar}>
      <SectionHeader
        eyebrow="Controllers"
        title="Select a controller"
        description="Choose one of the registered controllers to view its dashboard."
      />

      {error ? (
        <EmptyState
          title="Unable to load controllers"
          description={error}
          onRetry={refreshControllers}
        />
      ) : null}

      {notice ? (
        <div className="card">
          <p className="eyebrow">Info</p>
          <h3>Dashboard is available</h3>
          <p className="section-description">{notice}</p>
        </div>
      ) : null}

      {isLoading ? (
        <div className="card">
          <p className="section-description">Loading controllers...</p>
        </div>
      ) : !error && controllerIds.length === 0 ? (
        <EmptyState
          title="No controllers found"
          description="No controller has sent data yet. Once a controller starts reporting readings, it will appear here."
          onRetry={refreshControllers}
        />
      ) : (
        <div className="controller-grid">
          {controllerIds.map((id) => (
            <button
              key={id}
              className="controller-card"
              onClick={() => onSelectController(id)}
            >
              <div className="controller-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="controller-card__body">
                <p className="eyebrow">Controller</p>
                <h3>{id}</h3>
                <p className="controller-card__action">View dashboard →</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </PageShell>
  );
}

export default ControllersPage;
