// src/app/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>MK Starter SaaS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Base pronta para apps SaaS: login Supabase + UI + deploy.</p>
          <div className="flex gap-3">
            <Button asChild><Link href="/login">Entrar</Link></Button>
            <Button variant="secondary" asChild><Link href="/app">Ir para o App</Link></Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
