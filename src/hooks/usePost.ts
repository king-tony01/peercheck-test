"use client";

import { useCallback, useRef, useState } from "react";

export const usePost = <TData = unknown, TVariables = unknown>(
  endpoint: string,
  options: UsePostOptions<TData, TVariables> = {},
) => {
  const {
    requestInit,
    method = "POST",
    transformBody,
    headers,
    parser,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsIdle(false);
      setIsLoading(true);
      setError(null);

      const body = transformBody
        ? transformBody(variables)
        : variables instanceof FormData
          ? variables
          : JSON.stringify(variables ?? {});

      const finalHeaders = new Headers(headers || {});
      const shouldSetJsonHeader =
        !(body instanceof FormData) &&
        !finalHeaders.has("content-type") &&
        !finalHeaders.has("Content-Type");

      if (shouldSetJsonHeader) {
        finalHeaders.set("Content-Type", "application/json");
      }

      try {
        const res = await fetch(endpoint, {
          ...requestInit,
          method,
          headers: finalHeaders,
          body,
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

        let result: TData;
        if (parser) {
          result = await parser(res);
        } else {
          const contentType = res.headers.get("content-type") || "";
          if (res.status === 204) {
            result = null as unknown as TData;
          } else if (contentType.includes("application/json")) {
            result = await res.json();
          } else {
            result = (await res.text()) as unknown as TData;
          }
        }

        setData(result);
        setStatus(res.status);
        onSuccess?.(result, variables);
        return result;
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return null;
        }
        const apiError = err as ApiError;
        setError(apiError);
        setStatus(apiError.status ?? null);
        onError?.(apiError, variables);
        return null;
      } finally {
        setIsLoading(false);
        onFinally?.();
      }
    },
    [
      endpoint,
      requestInit,
      method,
      parser,
      transformBody,
      headers,
      onSuccess,
      onError,
      onFinally,
    ],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus(null);
    setIsIdle(true);
    setIsLoading(false);
  }, []);

  const state: UsePostState<TData> = {
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
    mutate,
    cancel,
    reset,
    setData,
    setError,
  };
};

export default usePost;
