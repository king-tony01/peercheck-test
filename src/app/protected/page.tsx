import { redirect } from "next/navigation";
import { ROUTE_PATHS } from "../../routes/routePaths";

export default function Home() {
  redirect(ROUTE_PATHS.ADMIN_DASHBOARD);
}
