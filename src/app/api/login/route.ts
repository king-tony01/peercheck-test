import proxyToApi from "@/lib/proxyToApi";
import { API_ROUTES, BACKEND_ROUTES } from "@/routes/apiRoutes";

export async function POST(req: Request) {
  // forwards request to upstream `login` endpoint
  const res = await proxyToApi(req, BACKEND_ROUTES.LOGIN_ADMIN);
  return res;
}
