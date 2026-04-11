import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ControllersPage from "../pages/ControllersPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

export function ProtectedView() {
  const { isAuthenticated, isInitializing } = useAuth();
  const [selectedController, setSelectedController] = useState(null);

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

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (selectedController) {
    return (
      <DashboardPage
        controllerId={selectedController}
        onBack={() => setSelectedController(null)}
      />
    );
  }

  return <ControllersPage onSelectController={setSelectedController} />;
}
