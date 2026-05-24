import { cookies } from "next/headers";

const SESSION_COOKIE = "artemis_admin_session";
const SESSION_VALUE = "authenticated";

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || "rafa@byutmb.com.br";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin";
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export function getSessionCookieConfig() {
  return {
    name: SESSION_COOKIE,
    value: SESSION_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function getLogoutCookieConfig() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export function verifyCredentials(email: string, password: string): boolean {
  return email === getAdminEmail() && password === getAdminPassword();
}
