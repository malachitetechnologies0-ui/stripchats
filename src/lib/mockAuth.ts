export function getCurrentDemoUserId() {
  return "viewer-1";
}

export function saveAgeConfirmation() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("stripchats_age_confirmed", "true");
  }
}

export function hasAgeConfirmation() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem("stripchats_age_confirmed") === "true";
}

export function clearAgeConfirmation() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("stripchats_age_confirmed");
  }
}
