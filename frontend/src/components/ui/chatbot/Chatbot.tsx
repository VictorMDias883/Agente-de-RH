/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const CHAT_API =API_BASE_URL+ "/chat/message";


function buildMessageId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function Chatbot(props: { text: string; }) {
  const initialMessages: Message[] = [
    {
      id: "system",
      role: "assistant",
      text: props.text,
    },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  useEffect(() => {
    setMessages((current) => {
      if (!props.text) return current;
      const first = current[0];
      if (first && first.id === "system") {
        if (first.text === props.text) return current;
        return [{ ...first, text: props.text }, ...current.slice(1)];
      }
      return [{ id: "system", role: "assistant", text: props.text }, ...current];
    });
  }, [props.text]);

  const sendDisabled = isLoading || inputValue.trim().length === 0;

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: buildMessageId(),
      role: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
        signal: AbortSignal.timeout(30000), // Timeout de 30 segundos
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Erro ao enviar mensagem");
      }

      const data = await response.json();
      const assistantAnswer = String(data.message || data.text || "Desculpe, não consegui responder agora.");

      setMessages((current) => [
        ...current,
        {
          id: buildMessageId(),
          role: "assistant",
          text: assistantAnswer,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Falha de conexão. Tente novamente mais tarde."
      );
      setMessages((current) => [
        ...current,
        {
          id: buildMessageId(),
          role: "assistant",
          text: "Não foi possível obter resposta agora. Verifique sua conexão ou a configuração do backend.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const conversationLabel = useMemo(
    () =>
      messages.length > 1
        ? `${messages.filter((message) => message.role === "user").length} perguntas enviadas`
        : "Comece a conversa",
    [messages]
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-[28px] border border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-black border border-zinc-800 text-white">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Assistente de Candidatos</h3>
            <p className="text-sm text-zinc-500">{conversationLabel}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-zinc-400">
          Use este chat para tirar dúvidas sobre o processo seletivo, vagas e envio de currículo.
        </p>
      </div>

      <div className="flex-1 overflow-hidden rounded-[28px] border border-zinc-800 bg-black p-4">
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[40vh]">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} text={message.text} />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <form className="grid gap-3" onSubmit={handleSend}>
        <div className="grid gap-2">
          <label htmlFor="chat-input" className="text-sm text-zinc-400">
            Escreva sua Resposta
          </label>
          <textarea
            id="chat-input"
            value={inputValue}
            rows={3}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Por exemplo: 'Eu tenho essa capacidade!'"
            className="w-full resize-none rounded-3xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none focus:border-white focus:ring-0"
          />
        </div>

        {error ? (
          <div className="rounded-3xl border border-rose-500 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={sendDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? "Respondendo..." : "Enviar mensagem"}
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
