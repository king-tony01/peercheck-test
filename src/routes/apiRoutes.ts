export const BACKEND_ROUTES = {
  LOGIN_ADMIN: "/auth/login",
  DASHBOARD_OVERVIEW: "/statistics/dashboard/overview",
  UPDATE_USER: "/api/users/update",
  DELETE_USER: "/api/users/delete",
  GET_REPORTS: "/api/reports",
  SUBMIT_REPORT: "/api/reports/submit",
  GET_SETTINGS: "/api/settings",
  UPDATE_SETTINGS: "/api/settings/update",
} as const;

export const API_ROUTES = {
  LOGIN: "/api/login",
  DASHBOARD_OVERVIEW: "/api/dashboard/overview",
  UPDATE_USER: "/api/users/update",
  DELETE_USER: "/api/users/delete",
  GET_REPORTS: "/api/reports",
  SUBMIT_REPORT: "/api/reports/submit",
  GET_SETTINGS: "/api/settings",
  UPDATE_SETTINGS: "/api/settings/update",
} as const;
