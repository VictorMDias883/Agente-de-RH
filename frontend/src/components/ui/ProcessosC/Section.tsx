"use client";

import { Clock3, FileSearch, MessagesSquare, CheckCircle2 } from "lucide-react";
import CandidateModal from "./CandidateModal";
import { useState } from "react";
export default function ProcessosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenProcess(vaga: string) {
    console.log("Abrir processo:", vaga);
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <section className="w-full min-h-screen bg-black text-white px-6 py-10 overflow-x-auto">
      <div className="min-w-[1400px] flex gap-6">
        <KanbanColumn
          title="Em recrutamento"
          icon={<Clock3 size={20} />}
          onCardClick={handleOpenProcess}
          cards={[
            {
              vaga: "Frontend Developer",
              empresa: "TechFlow",
              status: "Aguardando revisão",
            },
            {
              vaga: "UX Designer",
              empresa: "NovaCore",
              status: "Aguardando candidatos",
            },
          ]}
        />

        <KanbanColumn
          title="Análise de currículo"
          icon={<FileSearch size={20} />}
          onCardClick={handleOpenProcess}
          cards={[
            {
              vaga: "Backend Developer",
              empresa: "CloudSync",
              status: "Currículos em análise",
            },
            {
              vaga: "QA Analyst",
              empresa: "PixelWare",
              status: "Aguardando confirmação",
            },
          ]}
        />

        <KanbanColumn
          title="Entrevista"
          icon={<MessagesSquare size={20} />}
          onCardClick={handleOpenProcess}
          cards={[
            {
              vaga: "Product Manager",
              empresa: "NextSphere",
              status: "Entrevista agendada",
            },
          ]}
        />

        <KanbanColumn
          title="Esperando contratação"
          icon={<CheckCircle2 size={20} />}
          onCardClick={handleOpenProcess}
          cards={[
            {
              vaga: "Mobile Developer",
              empresa: "FutureCode",
              status: "Proposta enviada",
            },
          ]}
        />
      </div>
      <CandidateModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}

type CardType = {
  vaga: string;
  empresa: string;
  status: string;
};

type KanbanColumnProps = {
  title: string;
  icon: React.ReactNode;
  cards: CardType[];
  onCardClick: (vaga: string) => void;
};

function KanbanColumn({ title, icon, cards, onCardClick }: KanbanColumnProps) {
  return (
    <div className="w-[340px] flex-shrink-0 rounded-[32px] border border-zinc-800 bg-zinc-950 p-5">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-lg">{title}</h2>

          <p className="text-zinc-500 text-sm">{cards.length} processos</p>
        </div>
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {cards.map((card, index) => (
          <KanbanCard
            key={index}
            vaga={card.vaga}
            empresa={card.empresa}
            status={card.status}
            onClick={() => onCardClick(card.vaga)}
          />
        ))}
      </div>
    </div>
  );
}

type KanbanCardProps = {
  vaga: string;
  empresa: string;
  status: string;
  onClick: () => void;
};

function KanbanCard({ vaga, empresa, status, onClick }: KanbanCardProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full text-left rounded-2xl border border-zinc-800 bg-black p-5 hover:border-zinc-700 hover:bg-zinc-900 transition"
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-semibold text-lg">{vaga}</h3>

            <p className="text-zinc-500 text-sm mt-1">{empresa}</p>
          </div>

          <div className="w-3 h-3 rounded-full bg-green-500 mt-2" />
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <span className="inline-flex px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            {status}
          </span>
        </div>
      </button>
    </>
  );
}
