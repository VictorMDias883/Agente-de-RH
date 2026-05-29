"use client";

import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "assistant" | "user";
  text: string;
}

export function ChatMessage({ role, text }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`flex gap-3 rounded-3xl p-4 ${
        isAssistant ? "bg-zinc-950 border border-zinc-800" : "bg-zinc-900/70"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
        {isAssistant ? <Bot size={18} /> : <User size={18} />}
      </div>

      <div>
        <div className="text-sm font-medium text-zinc-400">{isAssistant ? "Assistente" : "Você"}</div>
        <p className="mt-2 text-sm leading-6 text-zinc-200 whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
