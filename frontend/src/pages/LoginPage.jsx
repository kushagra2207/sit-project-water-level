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
        <h1>{APP_NAME}</h1>
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
