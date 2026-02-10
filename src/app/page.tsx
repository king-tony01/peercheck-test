import { ROUTE_PATHS } from "@/routes/routePaths";
import { redirect } from "next/navigation";
import React from "react";

function MainHome() {
  redirect(ROUTE_PATHS.ADMIN_DASHBOARD);
}

export default MainHome;
