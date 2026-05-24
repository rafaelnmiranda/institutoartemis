import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionCookieConfig, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!verifyCredentials(email, password)) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieConfig());

  return NextResponse.json({ success: true });
}
