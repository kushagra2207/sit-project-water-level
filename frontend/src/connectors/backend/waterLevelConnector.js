import { apiRequest } from "../../services/http/apiClient";

export function getControllerIdsRequest() {
  return apiRequest("/water-level/controllers");
}

export function getLatestWaterLevelRequest() {
  return apiRequest("/water-level/latest");
}

export function getWaterLevelHistoryRequest(controllerId, { page = 1, limit = 8, sort = "desc" } = {}) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });

  return apiRequest(`/water-level/controller/${encodeURIComponent(controllerId)}?${searchParams.toString()}`);
}
