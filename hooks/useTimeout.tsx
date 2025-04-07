import { useEffect, useRef } from "react";

/**
 * Custom hook for managing timeouts with cleanup
 * @param callback - Function to call after the timeout
 * @param delay - Delay in milliseconds
 * @returns Function to trigger the timeout
 */
export const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const setTimeoutRef = () => {
    clearTimeoutRef();
    timeoutRef.current = setTimeout(callback, delay);
  };

  useEffect(() => {
    return clearTimeoutRef;
  }, []);

  return { setTimeoutRef, clearTimeoutRef };
};
