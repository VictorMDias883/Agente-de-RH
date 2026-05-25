"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("admin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const endpoint = `${API_BASE_URL}/${role === "admin" ? "admin" : "user"}/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || data.message || "Falha ao efetuar login. Verifique seus dados.");
        setLoading(false);
        return;
      }

      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("authRole", role);
        const redirectPath = role === "admin" ? "/admin/vagas" : "/candidato";
        router.push(redirectPath);
        return;
      }

      setMessage("Login realizado, mas não foi possível determinar a rota de redirecionamento.");
    } catch (error) {
      setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 md:p-10 shadow-2xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-3">Acesso</p>
          <h1 className="text-4xl font-bold">Entrar na plataforma</h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Use suas credenciais para acessar o painel administrativo ou a área do candidato. Selecione o tipo de acesso antes de entrar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`rounded-2xl px-5 py-4 text-sm font-semibold transition ${
                role === "admin"
                  ? "border border-white bg-white text-black"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              Administrador
            </button>
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-2xl px-5 py-4 text-sm font-semibold transition ${
                role === "user"
                  ? "border border-white bg-white text-black"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              Candidato
            </button>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-3" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white outline-none transition focus:border-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-3" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
              className="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white outline-none transition focus:border-white"
            />
          </div>

          {message && (
            <div className="rounded-2xl border border-rose-500 bg-rose-950/60 px-4 py-3 text-rose-200">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-6 py-4 text-black font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-sm text-zinc-500">
            Se você é administrador, use seu email de admin. Se for candidato, selecione <span className="font-semibold text-white">Candidato</span>.
          </p>
        </form>
      </div>
    </div>
  );
}
