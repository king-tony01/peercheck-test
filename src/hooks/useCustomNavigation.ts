"use client";

import { useContext } from "react";
import { CustomNavigationContext } from "../context/CustomNavigationContext";

export function useCustomNavigation() {
  const context = useContext(CustomNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useCustomNavigation must be used within a CustomNavigationProvider",
    );
  }
  return context;
}
