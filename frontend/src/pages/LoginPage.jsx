import { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { APP_NAME, APP_TAGLINE } from "../utils/constants";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Real-Time Monitoring",
    description: "Track live water level readings from your ESP32 controllers as data arrives.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Multi-Controller Support",
    description: "Manage and view data from multiple water tank controllers independently.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Historical Analytics",
    description: "Review past readings with paginated history tables and usage summaries.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Smart Alerts",
    description: "Visual status indicators highlight safe, warning, and critical water levels.",
  },
];

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
        <div className="login-hero__inner">
          <p className="eyebrow">{APP_TAGLINE}</p>
          <h1>Smart Water Tank Monitoring System</h1>
          <p className="login-hero__lead">
            A complete IoT dashboard to visualize and manage water consumption data from ESP32 controllers in real time.
          </p>

          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
              </div>
            ))}
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
