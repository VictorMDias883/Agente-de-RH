"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Bot } from "lucide-react";
import Chatbot from "../../components/ui/chatbot/Chatbot";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
export default function CandidatePage() {
  const router = useRouter();
  
  const [authorized, setAuthorized] = useState(false);
  const [phone, setPhone] = useState("");
  const [experience, setExp] = useState("");
  const [file, setFile] = useState<File| null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null)
  

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    const role = localStorage.getItem("authRole");
    if (!storedToken || role !== "user") {
      router.push("/login");
      return;
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(storedToken);
    setAuthorized(true);
  }, [router]);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if (!file) {
    setMessage("Envie um currículo");
    return;
  }
    const formData = new FormData();
    formData.append("phone", phone)
    formData.append("experience", experience)
    formData.append("curriculum", file)
    const endpoint = `${API_BASE_URL}/${"process"}/register`;
    try{
      const response = await fetch(endpoint, {
        method:"POST",
        headers:{
          "Authorization": `Bearer ${token}`,
        },
        body:formData
        
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.detail || "Erro ao enviar");
      }
      setMessage("Candidatura enviada!");
    }catch (error) {
      setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    } 
  }
  if (!authorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-950 p-10 text-center">
          <p className="text-sm text-zinc-400">Aguardando verificação de acesso...</p>
        </div>
      </div>
    );
  }

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
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* PHONE */}
            <div>
              <label className="block text-sm text-zinc-400 mb-3">
                Telefone
              </label>

              <input
                type="text"
                placeholder="Digite seu telefone"
                onChange={(event) => setPhone(event.target.value)}
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
                onChange = {(event) => setExp(event.target.value)}
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

                <input type="file" className="hidden" onChange = {(event) => {
                  if(event.target.files?.[0]){
                    setFile(event.target.files[0])
                  }
                }}/>
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
          <div className="flex-1 rounded-[28px] border border-zinc-800 bg-black p-6">
            <div className="h-full">
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
