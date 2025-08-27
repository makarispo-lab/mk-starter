// src/lib/supabase/server.ts
/*import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
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
        } = {}) => {
          // Next.js server actions/route handlers: permite setar cookies
          cookieStore.set({ name, value, ...options });
        },
        remove: (name: string, options: { 
          domain?: string; 
          path?: string; 
          httpOnly?: boolean; 
          secure?: boolean; 
          sameSite?: 'strict' | 'lax' | 'none' 
        } = {}) => {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}

  
