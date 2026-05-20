"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, LayoutDashboard, ChevronDown } from "lucide-react";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-20 border-b border-zinc-800 bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold">
            LOGO
          </Link>

          <nav className="flex items-center gap-8 text-sm">
            <Link
              href="/admin/vagas"
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition"
            >
              <Briefcase size={18} />
              Vagas
            </Link>

            <Link
              href="/admin/processos"
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition"
            >
              <LayoutDashboard size={18} />
              Processos
            </Link>
          </nav>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-900 transition"
          >
            {/* AVATAR */}
            <img
              src="https://placehold.co/100x100"
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover border border-zinc-700"
            />

            <ChevronDown
              size={18}
              className={`transition ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* DROPDOWN */}
          {isOpen && (
            <div className="absolute right-0 top-16 w-56 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
              <button className="w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-900 hover:text-white transition">
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
