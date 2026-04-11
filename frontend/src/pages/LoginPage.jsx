import { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { APP_NAME, APP_TAGLINE } from "../utils/constants";

function LoginPage() {
  const { login, isSubmitting } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(credentials) {
    try {
      setErrorMessage("");
      await login(credentials);
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <section className="login-hero">
        <p className="eyebrow">Water Intelligence Platform</p>
        <h1>{APP_NAME}</h1>
        <p className="login-hero__lead">{APP_TAGLINE}</p>
        <div className="login-hero__panel">
          <div>
            <span className="panel-label">Focus</span>
            <strong>Real-time water visibility</strong>
          </div>
          <div>
            <span className="panel-label">Project fit</span>
            <strong>Reservoir and controller monitoring</strong>
          </div>
          <div>
            <span className="panel-label">Next step</span>
            <strong>Secure login before dashboard access</strong>
          </div>
        </div>
      </section>

      <section className="login-card-wrapper">
        <div className="login-card">
          <p className="eyebrow">Admin Access</p>
          <h2>Sign in to continue</h2>
          <p>Use the backend admin credentials configured in your environment variables.</p>
          <LoginForm
            onSubmit={handleLogin}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
          />
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
