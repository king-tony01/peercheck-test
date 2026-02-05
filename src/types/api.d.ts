type ApiResponseStatus = "success" | "error";

interface BaseApiResponse<T = unknown> {
  message: string;
  status: string;
  code: number;
  data?: T;
}

interface ApiSuccessResponse<T = unknown> extends BaseApiResponse<T> {
  status: "success";
  data: T;
}

interface ApiErrorResponse extends BaseApiResponse<never> {
  status: "error";
  data?: never;
}

interface LoginAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  isSuperAdmin: boolean;
  createdAt: string;
}

interface LoginResponse extends ApiSuccessResponse<LoginAdmin> {
  accessToken: string;
}
