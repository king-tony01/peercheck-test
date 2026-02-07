"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface CustomNavigationContextType {
  open: boolean;
  toggleOpen: () => void;
  currentRoute: string;
}

export const CustomNavigationContext = createContext<
  CustomNavigationContextType | undefined
>(undefined);

export function CustomNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string>(pathname || "/");

  useEffect(() => {
    if (pathname) {
      setCurrentRoute(pathname);
    }
  }, [pathname]);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <CustomNavigationContext.Provider
      value={{ open, toggleOpen, currentRoute }}
    >
      {children}
    </CustomNavigationContext.Provider>
  );
}
