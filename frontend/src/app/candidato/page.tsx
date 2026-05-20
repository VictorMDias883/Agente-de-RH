"use client";

import { UploadCloud, Bot } from "lucide-react";

export default function CandidatePage() {
  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
        {/* LEFT SIDE */}
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 md:p-10">
          {/* HEADER */}
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Candidatura
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Candidate-se para a vaga.
            </h1>

            <p className="mt-4 text-zinc-400 leading-relaxed max-w-2xl">
              Preencha suas informações e envie seu currículo para iniciar o
              processo seletivo.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-8">
            {/* NAME */}
            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Nome completo
              </label>

              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-zinc-400 mb-3">Email</label>

              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Telefone
              </label>

              <input
                type="text"
                placeholder="Digite seu telefone"
                className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Experiência profissional
              </label>

              <textarea
                rows={6}
                placeholder="Fale brevemente sobre sua experiência..."
                className="w-full resize-none bg-black border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white transition"
              />
            </div>

            {/* CURRICULUM */}
            <div>
              <label className="block text-sm text-zinc-400 mb-4">
                Currículo
              </label>

              <label className="w-full min-h-[220px] rounded-[28px] border-2 border-dashed border-zinc-800 bg-black hover:border-zinc-700 transition flex flex-col items-center justify-center text-center px-6 cursor-pointer">
                <UploadCloud size={42} className="text-zinc-500 mb-5" />

                <h3 className="text-xl font-semibold">Clique para enviar</h3>

                <p className="mt-3 text-zinc-500 max-w-sm">
                  Suporte para PDF, DOC e DOCX.
                </p>

                <input type="file" className="hidden" />
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Enviar candidatura
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 md:p-10 flex flex-col">
          {/* HEADER */}
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center mb-6">
              <Bot size={32} />
            </div>

            <h2 className="text-3xl font-bold">Assistente IA</h2>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              Espaço reservado para integração do chatbot de atendimento e
              suporte ao candidato.
            </p>
          </div>

          {/* CHATBOT AREA */}
          <div className="flex-1 rounded-[28px] border border-zinc-800 bg-black p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 mx-auto mb-6 flex items-center justify-center">
                <Bot size={36} className="text-zinc-400" />
              </div>

              <h3 className="text-2xl font-semibold">Chatbot</h3>

              <p className="mt-4 text-zinc-500 max-w-md">
                Aqui você poderá integrar futuramente o fluxo de entrevista
                automatizada, perguntas técnicas e suporte ao candidato.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
