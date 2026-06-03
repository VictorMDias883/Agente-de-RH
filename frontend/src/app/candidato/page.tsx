"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Bot, CheckCircle2, AlertCircle, Loader2, File as FileIcon } from "lucide-react";
import Chatbot from "../../components/ui/chatbot/Chatbot";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
export default function CandidatePage() {
  const router = useRouter();
  
  const [authorized, setAuthorized] = useState(false);
  const [phone, setPhone] = useState("");
  const [experience, setExp] = useState("");
  const [file, setFile] = useState<File| null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Analysis, setAn] = useState("");

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
    setMessageType("error");
    return;
  }
    setIsLoading(true);
    setMessage(null);
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
      
      const candidateId = data.candidate_id;
      
      if(!response.ok){
        throw new Error(data.message || "Erro ao enviar");
      }
      setMessage("✨ Candidatura enviada com sucesso!");
      setMessageType("success");
      // Reset form
      setTimeout(() => {
        setFile(null);
        setPhone("");
        setExp("");
        setMessage(null);
        setMessageType(null);
      }, 2000);
      setTimeout(async () => {
        
        const res = await fetch(`${API_BASE_URL}/process/status/${candidateId}`)
        const date = await res.json()
        const printData = JSON.parse(date?.analysis);
        setAn(printData.pergunta);
        if(printData.status != "invalido"){
          setMessage("✨ Seu processo foi válido e será iniciado uma entrevista no chat ao lado!");
        setMessageType("success");
        }
      }, 5000);
      
    }catch (error) {
      setMessage("❌ Erro ao conectar com o servidor. Tente novamente mais tarde.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
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

                {file && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-lg">
                    <FileIcon size={18} className="text-green-500" />
                    <span className="text-sm text-green-400">{file.name}</span>
                  </div>
                )}

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
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
                isLoading 
                  ? "bg-zinc-800 text-zinc-400 cursor-not-allowed" 
                  : "bg-white text-black hover:opacity-90"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar candidatura"
              )}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-2xl flex items-start gap-3 ${
                messageType === "success" 
                  ? "bg-green-950 border border-green-800" 
                  : "bg-red-950 border border-red-800"
              }`}>
                {messageType === "success" ? (
                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <p className={messageType === "success" ? "text-green-300" : "text-red-300"}>
                  {message}
                </p>
              </div>
            )}
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
              <Chatbot text={Analysis}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
