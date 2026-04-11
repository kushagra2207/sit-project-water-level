import { useCallback, useEffect, useState } from "react";
import { getControllerIdsRequest } from "../connectors/backend/waterLevelConnector";

export function useControllers() {
  const [controllerIds, setControllerIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadControllers = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setNotice("");

    try {
      const response = await getControllerIdsRequest();
      setControllerIds(response.data || []);
    } catch (requestError) {
      const message = requestError.message || "Unable to load controllers.";

      if (message.includes("database is not available")) {
        setControllerIds([]);
        setNotice("Login is working. Controller list will appear after a database is connected.");
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadControllers();
  }, [loadControllers]);

  return {
    controllerIds,
    isLoading,
    error,
    notice,
    refreshControllers: loadControllers,
  };
}
