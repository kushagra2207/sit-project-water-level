import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getLatestWaterLevelRequest,
  getWaterLevelHistoryRequest,
} from "../connectors/backend/waterLevelConnector";
import { getLevelStatus } from "../utils/formatters";

export function useWaterLevel() {
  const [latestReading, setLatestReading] = useState(null);
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setNotice("");

    try {
      const [latestResponse, historyResponse] = await Promise.all([
        getLatestWaterLevelRequest(),
        getWaterLevelHistoryRequest(),
      ]);

      setLatestReading(latestResponse.data);
      setHistory(historyResponse.data || []);
      setPagination(historyResponse.pagination || null);
    } catch (requestError) {
      const message = requestError.message || "Unable to load water level data.";

      if (message.includes("database is not available")) {
        setLatestReading(null);
        setHistory([]);
        setPagination(null);
        setNotice("Login is working. Water level records will appear after a database is connected.");
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const insights = useMemo(() => {
    const latestStatus = getLevelStatus(latestReading?.percentage);
    const averagePercentage = history.length
      ? history.reduce((total, item) => total + Number(item.percentage || 0), 0) / history.length
      : 0;

    return {
      latestStatus,
      averagePercentage: Number(averagePercentage.toFixed(1)),
      totalRecords: pagination?.total || history.length,
      activeControllers: new Set(history.map((item) => item.controller_id)).size,
    };
  }, [history, latestReading, pagination]);

  return {
    latestReading,
    history,
    pagination,
    insights,
    isLoading,
    error,
    notice,
    refreshData: loadData,
  };
}
