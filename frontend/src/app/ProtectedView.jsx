import { useAuth } from "../hooks/useAuth";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

export function ProtectedView() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="screen-center">
        <div className="status-panel">
          <p className="eyebrow">SIT Water Level Monitor</p>
          <h1>Checking your session...</h1>
          <p>Preparing the monitoring dashboard and validating access.</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}
