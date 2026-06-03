import os

from dotenv import load_dotenv
from groq import Groq
load_dotenv()
class Chat:
    
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    def responder(messages:str):
        response = Chat.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                                    {
                    "role": "system",
                    "content": """
                Você é um recrutador técnico conduzindo uma entrevista de emprego.

                Você receberá o histórico completo da entrevista em formato JSON.

                Cada item possui:
                - index: número da pergunta
                - message: conteúdo da pergunta ou resposta

                Sua função é:
                - analisar todo o histórico
                - entender a última resposta do candidato
                - fazer a próxima pergunta relevante
                - manter contexto da conversa
                - aprofundar quando necessário

                Regras:
                - a entrevista possui exatamente 10 perguntas
                - cada pergunta deve ajudar a avaliar experiência, conhecimento técnico, comunicação e perfil profissional
                - não repita perguntas
                - não faça mais de uma pergunta por resposta
                - seja objetivo e profissional
                - responda apenas com a próxima pergunta
                - não use markdown
                - não use listas
                - não use títulos
                - não explique seu raciocínio
                - retorne apenas o texto da pergunta

                Se a décima pergunta já tiver sido feita e respondida, responda exatamente:

                ENTREVISTA_FINALIZADA
                """
                },
                    {
                        "role": "user",
                        "content": str(messages)
                    }
                ],
            temperature=0.8,
            max_tokens=120
        )
        return response.choices[0].message.content