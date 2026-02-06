import proxyToApi from "@/lib/proxyToApi";
import { BACKEND_ROUTES } from "@/routes/apiRoutes";

export async function GET(req: Request) {
  const res = await proxyToApi(req, BACKEND_ROUTES.DASHBOARD_OVERVIEW);
  return res;
}
