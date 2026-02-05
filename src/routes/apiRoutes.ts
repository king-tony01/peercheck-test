export const BACKEND_ROUTES = {
  LOGIN_ADMIN: "/auth/login",
  CREATE_USER: "/api/users/create",
  UPDATE_USER: "/api/users/update",
  DELETE_USER: "/api/users/delete",
  GET_REPORTS: "/api/reports",
  SUBMIT_REPORT: "/api/reports/submit",
  GET_SETTINGS: "/api/settings",
  UPDATE_SETTINGS: "/api/settings/update",
} as const;

export const API_ROUTES = {
  LOGIN: "/api/login",
  CREATE_USER: "/api/users/create",
  UPDATE_USER: "/api/users/update",
  DELETE_USER: "/api/users/delete",
  GET_REPORTS: "/api/reports",
  SUBMIT_REPORT: "/api/reports/submit",
  GET_SETTINGS: "/api/settings",
  UPDATE_SETTINGS: "/api/settings/update",
} as const;
