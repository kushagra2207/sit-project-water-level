import { useState } from "react";
import { Button } from "../common/Button";

const initialState = {
  username: "",
  password: "",
};

export function LoginForm({ onSubmit, isSubmitting, errorMessage }) {
  const [formState, setFormState] = useState(initialState);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(formState);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          name="username"
          placeholder="Enter admin username"
          value={formState.username}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formState.password}
          onChange={handleChange}
          required
        />
      </label>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Login to dashboard"}
      </Button>
    </form>
  );
}
