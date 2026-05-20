"use client";

import { useState } from "react";

type CandidateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CandidateModal({
  isOpen,
  onClose,
}: CandidateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
      {/* BACKDROP */}
      <div onClick={onClose} className="absolute inset-0" />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 text-white animate-in fade-in zoom-in duration-200">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            {/* PHOTO */}
            <img
              src="https://placehold.co/120x120"
              alt="Candidate"
              className="w-20 h-20 rounded-2xl object-cover border border-zinc-800"
            />

            {/* INFO */}
            <div>
              <h2 className="text-3xl font-bold">João Silva</h2>

              <p className="text-zinc-400 mt-2">Frontend Developer</p>
            </div>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-8">
          {/* CONTACT */}
          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <h3 className="text-lg font-semibold mb-5">Contato</h3>

            <div className="space-y-3 text-zinc-400">
              <p>Email: joao@empresa.com</p>

              <p>Telefone: (11) 99999-9999</p>

              <p>LinkedIn: linkedin.com/in/joao</p>
            </div>
          </div>

          {/* STATUS */}
          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <h3 className="text-lg font-semibold mb-5">Status do processo</h3>

            <div className="inline-flex px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300">
              Aguardando confirmação
            </div>
          </div>

          {/* CURRICULUM */}
          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <h3 className="text-lg font-semibold mb-5">Currículo</h3>

            <button className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition">
              Visualizar currículo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
