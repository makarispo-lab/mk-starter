// src/app/app/luck-client.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FRASES = [
  "Você está a um passo de algo incrível.",
  "Disciplina vence talento quando o talento não se esforça.",
  "Pequenos passos, grandes distâncias.",
  "Hoje você criou o seu próprio impulso.",
  "Seu futuro agradece o que você está fazendo agora.",
];

function gerarSeisNumeros(): number[] {
  const set = new Set<number>();
  while (set.size < 6) {
    set.add(1 + Math.floor(Math.random() * 60)); // 1..60
  }
  return Array.from(set).sort((a, b) => a - b);
}

export function LuckClient({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);
  const [nums, setNums] = useState<number[]>([]);
  const [frase, setFrase] = useState<string>("");

  function verSuaSorte() {
    setNums(gerarSeisNumeros());
    setFrase(FRASES[Math.floor(Math.random() * FRASES.length)]);
    setOpen(true);
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Bem-vindo(a), {userEmail}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Seu starter SaaS está funcionando. Teste o botão abaixo:</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={verSuaSorte}>Veja sua sorte</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Seus números da sorte</DialogTitle>
              </DialogHeader>
              <div className="text-2xl font-bold tracking-widest">
                {nums.join(" - ")}
              </div>
              <p className="mt-2 opacity-80">{frase}</p>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setOpen(false)}>Fechar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </main>
  );
}
