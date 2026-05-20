"use client";

import { useState } from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";

export default function VagasPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [technicalRequirements, setTechnicalRequirements] = useState("");
  const [vacancies, setVacancies] = useState("");

  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        {/* LEFT SIDE */}
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 md:p-10">
          {/* HEADER */}
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

          {/* FORM */}
          <form className="space-y-8">
            {/* JOB TITLE */}
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

            {/* REQUIREMENTS */}
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

            {/* VACANCIES */}
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

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Criar vaga
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* ACTIVE JOBS */}
          <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Briefcase size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Vagas em andamento</h2>

                <p className="text-zinc-500 text-sm">
                  Processos seletivos ativos
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <JobCard
                title="Frontend Developer"
                candidates="42 candidatos"
                status="Em recrutamento"
              />

              <JobCard
                title="UX/UI Designer"
                candidates="18 candidatos"
                status="Entrevistas"
              />

              <JobCard
                title="Product Manager"
                candidates="27 candidatos"
                status="Triagem"
              />
            </div>
          </div>

          {/* CLOSED JOBS */}
          <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Vagas fechadas</h2>

                <p className="text-zinc-500 text-sm">Contratações concluídas</p>
              </div>
            </div>

            <div className="space-y-4">
              <JobCard
                title="Backend Developer"
                candidates="Contratação finalizada"
                status="Fechada"
              />

              <JobCard
                title="QA Analyst"
                candidates="Contratação finalizada"
                status="Fechada"
              />
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
};

function JobCard({ title, candidates, status }: JobCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-5 hover:border-zinc-700 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>

          <p className="text-zinc-500 text-sm mt-2">{candidates}</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
          {status}
        </span>
      </div>
    </div>
  );
}
