// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const supabase = createSupabaseBrowserClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Entrar com e-mail</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={status==="sending"}>
              {status==="sending" ? "Enviando..." : "Enviar magic link"}
            </Button>
            {status==="sent" && <p>Confira seu e-mail e clique no link para entrar.</p>}
            {status==="error" && <p className="text-red-600">Erro ao enviar link. Tente novamente.</p>}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
