import { apiRequest } from "../../services/http/apiClient";

export function loginRequest(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getCurrentUserRequest() {
  return apiRequest("/auth/me");
}
