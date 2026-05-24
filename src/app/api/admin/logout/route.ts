import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLogoutCookieConfig } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(getLogoutCookieConfig());
  return NextResponse.json({ success: true });
}
