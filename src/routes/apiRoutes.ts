export const BACKEND_ROUTES = {
  LOGIN_ADMIN: "/auth/login",
  DASHBOARD_OVERVIEW: "/statistics/dashboard/overview",
  DASHBOARD_USER_ENGAGEMENT_CHART: "/statistics/dashboard/user-engagement",
  ANALYTICS_COMPANY_INSIGHTS: "/statistics/company-analytics",
  ANALYTICS_COMPANY_INSIGHTS_REVIEW_BY_INDUSTRY:
    "/companies/insights/review-volume-by-industry",
  ANALYTICS_COMPANY_INSIGHTS_COVERAGE_DEPTH_BY_INDUSTRY:
    "/companies/insights/company-coverage-depth",
  ANALYTICS_USERS_INSIGHTS: "/statistics/user-analytics",
  DASHBOARD_RECENT_ACTIVITY: "/logs/recent",
  LOGOUT_ADMIN: "/auth/logout",
  SAMPLE_COMPANIES: "/companies",
  UPDATE_SETTINGS: "/api/settings/update",
} as const;

export const API_ROUTES = {
  LOGIN: "/api/login",
  DASHBOARD_OVERVIEW: "/api/dashboard/overview",
  DASHBOARD_USER_ENGAGEMENT_CHART: "/api/dashboard/user-engagement-chart",
  DASHBOARD_RECENT_ACTIVITY: "/api/dashboard/recent-activity",
  ANALYTICS_COMPANY_INSIGHTS: "/api/analytics/company-insights",
  ANALYTICS_COMPANY_INSIGHTS_REVIEW_BY_INDUSTRY:
    "/api/analytics/company-insights/review-volume-by-industry",
  ANALYTICS_COMPANY_INSIGHTS_COVERAGE_DEPTH_BY_INDUSTRY:
    "/api/analytics/company-insights/coverage-depth-by-industry",
  ANALYTICS_USERS_INSIGHTS: "/api/analytics/user-insights",
  LOGOUT_ADMIN: "/api/logout",
  SAMPLE_COMPANIES: "/api/companies",
  UPDATE_SETTINGS: "/api/settings/update",
} as const;
