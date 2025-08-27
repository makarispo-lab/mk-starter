import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: (name: string, value: string, options: { 
            domain?: string; 
            path?: string; 
            maxAge?: number; 
            httpOnly?: boolean; 
            secure?: boolean; 
            sameSite?: 'strict' | 'lax' | 'none' 
          } = {}) =>
            cookieStore.set({ name, value, ...options }),
          remove: (name: string, options: { 
            domain?: string; 
            path?: string; 
            httpOnly?: boolean; 
            secure?: boolean; 
            sameSite?: 'strict' | 'lax' | 'none' 
          } = {}) =>
            cookieStore.set({ name, value: "", ...options, maxAge: 0 }),
        },
      }
    );

    // Troca o "code" pelo cookie de sessão
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redireciona para a sua área logada
  return NextResponse.redirect(new URL("/app", origin));
}
