"use client";

import { FormEvent, useEffect, useState } from "react";
import { Briefcase, CheckCircle2, Loader2, Trash2 } from "lucide-react";

type Vaga = {
  id?: number;
  name: string;
  espec: string;
  quantity: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function VagasPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [technicalRequirements, setTechnicalRequirements] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  async function loadVagas() {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/list`);
      if (!response.ok) throw new Error("Não foi possível carregar as vagas.");

      const data = await response.json();
      setVagas(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao carregar vagas.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadVagas();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!jobTitle.trim() || !technicalRequirements.trim() || !vacancies) {
      setMessage("Preencha todos os campos antes de criar a vaga.");
      setMessageType("error");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/vagas/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: jobTitle.trim(),
          espec: technicalRequirements.trim(),
          quantity: Number(vacancies),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Erro ao criar a vaga.");
      }

      setMessage("Vaga criada com sucesso.");
      setMessageType("success");
      setJobTitle("");
      setTechnicalRequirements("");
      setVacancies("");
      await loadVagas();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao criar a vaga.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(vaga: Vaga) {
    const confirmed = window.confirm(`Deseja apagar a vaga "${vaga.name}"?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/vagas/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: vaga.name }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Erro ao remover a vaga.");
      }

      setMessage("Vaga removida com sucesso.");
      setMessageType("success");
      await loadVagas();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao remover a vaga.");
      setMessageType("error");
    }
  }

  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 md:p-10">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Nova vaga
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Crie um novo processo seletivo.
            </h1>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              Defina os requisitos da vaga e inicie automaticamente o fluxo de
              recrutamento.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Nome da vaga
              </label>

              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ex: Desenvolvedor Frontend"
                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Especificações técnicas
              </label>

              <textarea
                value={technicalRequirements}
                onChange={(e) => setTechnicalRequirements(e.target.value)}
                placeholder="Tecnologias, experiência necessária, requisitos obrigatórios..."
                rows={7}
                className="w-full resize-none bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Quantidade de vagas
              </label>

              <input
                type="number"
                value={vacancies}
                onChange={(e) => setVacancies(e.target.value)}
                placeholder="Ex: 3"
                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            {message ? (
              <p className={messageType === "success" ? "text-green-400" : "text-red-400"}>
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition disabled:opacity-70"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Salvando...
                </span>
              ) : (
                "Criar vaga"
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Briefcase size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Vagas em andamento</h2>
                <p className="text-zinc-500 text-sm">Processos seletivos ativos</p>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8 text-zinc-400">
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Carregando vagas...
                </div>
              ) : vagas.length === 0 ? (
                <p className="text-zinc-500 text-sm">Nenhuma vaga cadastrada ainda.</p>
              ) : (
                vagas.map((vaga) => (
                  <JobCard
                    key={vaga.id ?? vaga.name}
                    title={vaga.name}
                    candidates={`${vaga.quantity} vaga${vaga.quantity > 1 ? "s" : ""}`}
                    status="Ativa"
                    description={vaga.espec}
                    onDelete={() => handleDelete(vaga)}
                  />
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

type JobCardProps = {
  title: string;
  candidates: string;
  status: string;
  description?: string;
  onDelete?: () => void;
};

function JobCard({ title, candidates, status, description, onDelete }: JobCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-5 hover:border-zinc-700 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          {description ? <p className="text-zinc-500 text-sm mt-2">{description}</p> : null}
          <p className="text-zinc-500 text-sm mt-2">{candidates}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            {status}
          </span>
          {onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="rounded-full border border-zinc-800 p-2 text-zinc-400 hover:text-white hover:border-zinc-700 transition"
            >
              <Trash2 size={16} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
