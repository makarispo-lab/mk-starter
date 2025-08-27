import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AppPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">
        Olá, {session.user.email}
      </h1>
      <p className="mt-2">Login com magic link concluído ✅</p>
      <a className="underline mt-6 inline-block" href="/logout">Sair</a>
    </main>
  );
}
