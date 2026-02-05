type UseFetchOptions<T> = HttpRequestOptions<T> & {
  requestInit?: RequestInit;
  immediate?: boolean;
  enabled?: boolean;
  keepPreviousData?: boolean;
  deps?: React.DependencyList;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  onFinally?: () => void;
};

type UseFetchState<T> = {
  data: T | null;
  error: ApiError | null;
  status: number | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type UsePostOptions<TData, TVariables> = HttpRequestOptions<TData> & {
  requestInit?: RequestInit;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  transformBody?: (variables: TVariables) => BodyInit;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onFinally?: () => void;
};

type UsePostState<TData> = {
  data: TData | null;
  error: ApiError | null;
  status: number | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
