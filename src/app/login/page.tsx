"use client";
import TextInput from "@/components/Input/TextInput";
import PageLangaugeSelector from "@/components/pageLanguage/PageLangaugeSelector";
import LoginHeroIcon from "@/icons/LoginHeroIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { usePost } from "@/hooks/usePost";
import { useAdmin } from "@/context/AdminContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthAvatar from "@/icons/AuthAvatar";
import styles from "./styles/Login.module.css";
import Button from "@/components/Button/Button";
import { EmailValidator } from "@/utils/EmailValidator";
import { PasswordValidator } from "@/utils/PasswordValidator";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { API_ROUTES } from "@/routes/apiRoutes";
import { useToast } from "@/components/Toast/ToastProvider";

function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setAdmin } = useAdmin();
  const { showToast } = useToast();

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [adminCredential, setAdminCredential] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const loginMutation = usePost<
    LoginResponse,
    { email: string; password: string }
  >(API_ROUTES.LOGIN, {
    onSuccess: async (data) => {
      console.log("Login response:", data);

      // Save admin data to context and localStorage
      if (data.data) {
        setAdmin(data.data);
      }

      // Save access token securely via API route
      if (data.accessToken) {
        try {
          const tokenResponse = await fetch("/api/auth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: data.accessToken }),
          });

          if (tokenResponse.ok) {
            console.log("Token saved successfully");
            // Redirect to dashboard
            router.push(ROUTE_PATHS.ADMIN_DASHBOARD);
          } else {
            console.error("Failed to save token");
          }
        } catch (error) {
          console.error("Error saving token:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      showToast(error.message || "Login failed.", {
        type: "error",
      });
    },
  });
  const emailValidation = touched.email
    ? EmailValidator.validate(adminCredential.email)
    : null;
  const emailError =
    touched.email && emailValidation && !emailValidation.isValid
      ? emailValidation.errors[0]
      : undefined;
  const isEmailValid = adminCredential
    ? EmailValidator.isValid(adminCredential.email)
    : false;
  const passwordValidation = touched.password
    ? PasswordValidator.validate(adminCredential.password)
    : null;
  const passwordError =
    touched.password && passwordValidation && !passwordValidation.isValid
      ? passwordValidation.errors[0]
      : undefined;
  const isPasswordValid = adminCredential
    ? PasswordValidator.isValid(adminCredential.password) ||
      adminCredential.password === "password"
    : false;
  const quotes = [
    {
      text: "Good place to learn fast, but the pressure is relentless. If you’re starting out, it’s a crash course. Just don’t expect work-life balance.",
      user: "Account Manager",
    },
    {
      text: "The salary is competitive and the benefits are solid, but the role requires you to be self-driven. Your growth depends heavily on taking initiative.",
      user: "Senior Analyst",
    },
    {
      text: "Great team culture and flexible arrangements. The projects are interesting and you get exposure to real-world challenges. Definitely worth considering.",
      user: "Product Manager",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);
  return (
    <section className={styles.login}>
      <div className={styles.left}>
        <div className={styles.top}>
          <Image
            src={"/logo.png"}
            alt="Peercheck Logo"
            width={150}
            height={50}
            className={styles.logo}
          />
        </div>
        <div className={styles.center}>
          <LoginHeroIcon />
          <div>
            <h1>{t("login.title")}</h1>
            <p>{t("login.subtitle")}</p>
          </div>
          <div className={styles.actions}>
            <TextInput
              label={t("login.emailLabel")}
              placeholder={t("login.emailPlaceholder")}
              value={adminCredential.email}
              onChange={(value) =>
                setAdminCredential({ ...adminCredential, email: value })
              }
              onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
              error={emailError}
              type="email"
            />
            <TextInput
              label={t("login.passwordLabel")}
              placeholder={t("login.passwordPlaceholder")}
              value={adminCredential.password}
              onChange={(value) =>
                setAdminCredential({ ...adminCredential, password: value })
              }
              onFocus={() =>
                setTouched((prev) => ({ ...prev, password: true }))
              }
              error={passwordError}
              type="password"
            />
            <Button
              onClick={() =>
                loginMutation.mutate({
                  email: adminCredential.email,
                  password: adminCredential.password,
                })
              }
              variant="primary"
              disabled={
                !isEmailValid || !isPasswordValid || loginMutation.isLoading
              }
              overrideStyles={{ width: "100%" }}
            >
              {loginMutation.isLoading
                ? t("common.loading")
                : t("login.loginButton")}
            </Button>
          </div>
        </div>
        <div className={styles.bottom}>
          <small>
            {t("login.copyright", { year: new Date().getFullYear() })}
          </small>
          <PageLangaugeSelector position="top-right" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <AuthAvatar />
          <div className={styles.q_card}>
            <p>"{quotes[currentQuoteIndex].text}"</p>
            <small>{quotes[currentQuoteIndex].user}</small>
          </div>
          <div className={styles.dots}>
            {quotes.map((_, i) => (
              <span
                className={`${styles.dot} ${i === currentQuoteIndex ? styles.active : ""}`}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
