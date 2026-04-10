import { createContext, useEffect, useMemo, useState } from "react";
import { getCurrentUserRequest, loginRequest } from "../connectors/backend/authConnector";
import { STORAGE_KEYS } from "../utils/constants";

export const AuthContext = createContext(null);

function getStoredUser() {
  const rawUser = localStorage.getItem(STORAGE_KEYS.authUser);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEYS.authUser);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.authToken);

    if (!token) {
      setIsInitializing(false);
      return;
    }

    getCurrentUserRequest()
      .then((response) => {
        setUser(response.user);
        localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(response.user));
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEYS.authToken);
        localStorage.removeItem(STORAGE_KEYS.authUser);
        setUser(null);
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, []);

  async function login(credentials) {
    setIsSubmitting(true);

    try {
      const response = await loginRequest(credentials);
      localStorage.setItem(STORAGE_KEYS.authToken, response.token);
      localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(response.user));
      setUser(response.user);
      return response;
    } finally {
      setIsSubmitting(false);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.authToken);
    localStorage.removeItem(STORAGE_KEYS.authUser);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      isSubmitting,
      login,
      logout,
    }),
    [user, isInitializing, isSubmitting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
