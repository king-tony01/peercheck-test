"use client";

import SearchInput from "@/components/Input/SearchInput";
import ChevronDown from "@/icons/ChevronDown";
import Image from "next/image";
import styles from "./styles/TopBar.module.css";
import { usePost } from "@/hooks/usePost";
import { API_ROUTES } from "@/routes/apiRoutes";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/routes/routePaths";
import { useAdmin } from "@/context/AdminContext";
import { useState } from "react";
import HamburgerIcon from "@/icons/HamburgerIcon";
import { useCustomNavigation } from "@/hooks/useCustomNavigation";

function TopBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { clearAdmin } = useAdmin();
  const { open: navOpen, toggleOpen } = useCustomNavigation();

  const logoutMutation = usePost<void, void>(API_ROUTES.LOGOUT_ADMIN, {
    onSuccess: async () => {
      await fetch("/api/auth/token", { method: "DELETE" });
      clearAdmin();
      router.push(ROUTE_PATHS.ADMIN_LOGIN);
    },
  });

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    logoutMutation.mutate(undefined as void);
  };

  return (
    <section className={styles.top_bar}>
      <div className={styles.top_bar_left}>
        <button onClick={toggleOpen}>
          <HamburgerIcon />
        </button>
        <h1>Welcome Back, Alex</h1>
      </div>
      <div className={styles.top_bar_right}>
        <SearchInput placeholder="Search" />
        <button className={styles.action_btn} onClick={() => setOpen(!open)}>
          <Image src="/avatar.svg" alt="User Avatar" width={40} height={40} />
          <ChevronDown />
          {open && (
            <div className={styles.dropdown}>
              <p>Administrator</p>
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isLoading}
              >
                {logoutMutation.isLoading ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          )}
        </button>
      </div>
    </section>
  );
}

export default TopBar;
