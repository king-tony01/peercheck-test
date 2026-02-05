"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = <T = unknown>(
  endpoint: string | null,
  options: UseFetchOptions<T> = {},
) => {
  const {
    requestInit,
    immediate = true,
    enabled = true,
    keepPreviousData = false,
    deps = [],
    headers,
    parser,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint || !enabled) return null;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (!keepPreviousData) {
      setData(null);
    }
    setError(null);
    setIsIdle(false);
    setIsLoading(true);

    try {
      const res = await fetch(endpoint, {
        ...requestInit,
        headers,
        signal: controller.signal,
      });

      if (!res.ok) {
        let errorData: unknown = null;
        try {
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            errorData = await res.json();
          } else {
            errorData = await res.text();
          }
        } catch {
          errorData = null;
        }

        const message =
          typeof errorData === "object" && errorData && "message" in errorData
            ? String((errorData as { message: string }).message)
            : res.statusText || "Request failed";

        throw {
          message,
          status: res.status,
          data: errorData,
        } as ApiError;
      }

      let result: T;
      if (parser) {
        result = await parser(res);
      } else {
        const contentType = res.headers.get("content-type") || "";
        if (res.status === 204) {
          result = null as unknown as T;
        } else if (contentType.includes("application/json")) {
          result = await res.json();
        } else {
          result = (await res.text()) as unknown as T;
        }
      }

      setData(result);
      setStatus(res.status);
      onSuccess?.(result);
      return result;
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        return null;
      }
      const apiError = err as ApiError;
      setError(apiError);
      setStatus(apiError.status ?? null);
      onError?.(apiError);
      return null;
    } finally {
      setIsLoading(false);
      onFinally?.();
    }
  }, [
    endpoint,
    enabled,
    keepPreviousData,
    requestInit,
    headers,
    parser,
    onSuccess,
    onError,
    onFinally,
  ]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (!immediate || !enabled || !endpoint) return;
    void fetchData();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, immediate, enabled, ...deps]);

  const state: UseFetchState<T> = {
    data,
    error,
    status,
    isIdle,
    isLoading,
    isSuccess: !isLoading && !error && !isIdle,
    isError: !!error,
  };

  return {
    ...state,
    refetch: fetchData,
    cancel,
    setData,
    setError,
  };
};

export default useFetch;
