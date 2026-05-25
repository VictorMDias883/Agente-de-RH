import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-10 md:p-14">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-4">Agente RH</p>
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
              Plataforma de recrutamento para administradores e candidatos.
            </h1>
            <p className="mt-6 text-zinc-400 text-lg leading-8">
              Acesse a área de login para gerenciar vagas, acompanhar processos ou enviar candidaturas.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Entrar na plataforma
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
