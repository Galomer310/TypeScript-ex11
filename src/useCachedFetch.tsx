import { useState, useEffect, useCallback } from "react";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheEntry<any>> = {};

const isCacheValid = (key: string, maxAge: number): boolean => {
  if (!cache[key]) return false;
  const age = Date.now() - cache[key].timestamp;
  return age < maxAge;
};

export const useCachedFetch = <T,>(
  url: string,
  maxAge: number = 5 * 60 * 1000 // Default: 5 minutes
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if cached data is valid
      if (isCacheValid(url, maxAge)) {
        setData(cache[url].data);
        setLoading(false);
        return;
      }

      // Fetch fresh data
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result: T = await response.json();

      // Store in cache with timestamp
      cache[url] = { data: result, timestamp: Date.now() };
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, maxAge]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manual refresh function to invalidate cache and re-fetch
  const refresh = () => {
    delete cache[url]; // Invalidate cache
    fetchData();
  };

  return { data, loading, error, refresh };
};
