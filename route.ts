import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
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

  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", origin));
}
