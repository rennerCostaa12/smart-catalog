import type { AuthUser } from "./types";

const AUTH_COOKIE_NAME = "smart_catalog_auth";

function getTokenExpiration(token: string) {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decodedPayload = JSON.parse(atob(normalizedPayload)) as {
      exp?: unknown;
    };

    return typeof decodedPayload.exp === "number"
      ? decodedPayload.exp * 1000
      : null;
  } catch {
    return null;
  }
}

export function isAuthSessionValid(user: AuthUser) {
  const expiresAt = getTokenExpiration(user?.token);

  return expiresAt !== null && expiresAt > Date.now();
}

export function getAuthSessionExpiration(user: AuthUser) {
  return getTokenExpiration(user.token);
}

export function readAuthSessionCookie(): AuthUser | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  try {
    const user = JSON.parse(
      decodeURIComponent(cookie.slice(AUTH_COOKIE_NAME.length + 1)),
    ) as AuthUser;

    if (
      typeof user.id !== "number" ||
      typeof user.name !== "string" ||
      typeof user.email !== "string" ||
      typeof user.phone !== "string" ||
      typeof user.token !== "string" ||
      !isAuthSessionValid(user)
    ) {
      clearAuthSessionCookie();
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: user.token,
    };
  } catch {
    clearAuthSessionCookie();
    return null;
  }
}

export function writeAuthSessionCookie(user: AuthUser) {
  if (typeof document === "undefined") {
    return false;
  }

  const expiresAt = getTokenExpiration(user.token);

  if (!expiresAt || expiresAt <= Date.now()) {
    clearAuthSessionCookie();
    return false;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = encodeURIComponent(JSON.stringify(user));

  document.cookie = `${AUTH_COOKIE_NAME}=${value}; Path=/; Expires=${new Date(
    expiresAt,
  ).toUTCString()}; SameSite=Lax${secure}`;

  return true;
}

export function clearAuthSessionCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}
