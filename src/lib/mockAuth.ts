import type { User } from "@/types";

const AUTH_KEY = "creatorlive_demo_auth_user";
const AGE_KEY = "creatorlive_age_confirmed";

export function loginDemoUser(email: string, password: string) {
  if (!email.trim() || !password.trim()) {
    return { ok: false, message: "Email and password are required." };
  }

  const user = {
    id: "viewer-1",
    name: "Demo Viewer",
    email,
    role: "user" as const
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  return { ok: true, message: "Logged in as demo user.", user };
}

export function signupDemoUser(data: { name: string; email: string; password: string; confirmPassword: string; role: User["role"] }) {
  if (!data.name.trim() || !data.email.trim() || !data.password.trim() || !data.confirmPassword.trim()) {
    return { ok: false, message: "All signup fields are required." };
  }

  if (data.password !== data.confirmPassword) {
    return { ok: false, message: "Passwords do not match." };
  }

  const user = {
    id: data.role === "creator" ? "creator-demo" : "viewer-1",
    name: data.name,
    email: data.email,
    role: data.role
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  return { ok: true, message: "Demo account created.", user };
}

export function logoutDemoUser() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_KEY);
  }
  return { ok: true, message: "Logged out of demo account." };
}

export function getCurrentDemoUserId() {
  return "viewer-1";
}

export function saveAgeConfirmation() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AGE_KEY, "true");
  }
}

export function hasAgeConfirmation() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(AGE_KEY) === "true";
}

export function clearAgeConfirmation() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AGE_KEY);
  }
}
