"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  admin: LoginAdmin | null;
  setAdmin: (admin: LoginAdmin | null) => void;
  clearAdmin: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_ID_KEY = "peercheck_admin_id";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdminState] = useState<LoginAdmin | null>(null);

  useEffect(() => {
    // Load admin ID from localStorage on mount
    const storedId = localStorage.getItem(ADMIN_ID_KEY);
    if (storedId && !admin) {
      // If we have a stored ID but no admin data, set partial data
      setAdminState({ id: storedId } as LoginAdmin);
    }
  }, []);

  const setAdmin = (adminData: LoginAdmin | null) => {
    setAdminState(adminData);
    if (adminData?.id) {
      localStorage.setItem(ADMIN_ID_KEY, adminData.id);
    } else {
      localStorage.removeItem(ADMIN_ID_KEY);
    }
  };

  const clearAdmin = () => {
    setAdminState(null);
    localStorage.removeItem(ADMIN_ID_KEY);
  };

  const isAuthenticated = !!admin?.id;

  return (
    <AdminContext.Provider
      value={{ admin, setAdmin, clearAdmin, isAuthenticated }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
