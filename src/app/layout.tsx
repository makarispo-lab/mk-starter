// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MK Starter",
  description: "Starter SaaS com Supabase Auth e UI shadcn",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-background text-foreground">{children}</body>
    </html>
  );
}
