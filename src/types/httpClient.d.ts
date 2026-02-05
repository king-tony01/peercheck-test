type ApiError = {
  message: string;
  status?: number;
  data?: unknown;
};

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type HttpRequestOptions<T> = {
  baseUrl?: string;
  query?: QueryParams;
  headers?: HeadersInit;
  parser?: (response: Response) => Promise<T>;
};

type RequestResult<T> = {
  data: T;
  status: number;
};
