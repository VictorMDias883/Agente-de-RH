import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = String(body?.message || "").trim();

  if (!message) {
    return NextResponse.json({ error: "É necessário enviar uma mensagem." }, { status: 400 });
  }

  if (BACKEND_URL) {
    try {
      const backendResponse = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!backendResponse.ok) {
        const errorData = await backendResponse.json().catch(() => null);
        throw new Error(errorData?.detail || "Erro ao encaminhar mensagem para o backend.");
      }

      const backendData = await backendResponse.json();
      return NextResponse.json({ answer: backendData.answer || backendData.text || backendData.result });
    } catch (err) {
      return NextResponse.json(
        { answer: "O chatbot está disponível, mas não conseguiu alcançar o backend. Verifique a configuração do servidor." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    answer: `A integração de backend ainda não está configurada. Sua pergunta foi: "${message}". Para ativar o chatbot completo, adicione um endpoint POST ${BACKEND_URL || "<BACKEND_URL>"}/chat que retorne { answer: string }.`,
  });
}
