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
                    
                    * index: número da pergunta
                    * message: conteúdo da pergunta ou resposta
                    
                    Sua função é:
                    
                    * analisar todo o histórico
                    * entender a última resposta do candidato
                    * fazer a próxima pergunta relevante
                    * manter contexto da conversa
                    * aprofundar quando necessário
                    
                    Regras:
                    
                    * a entrevista possui exatamente 10 perguntas
                    * cada pergunta deve ajudar a avaliar experiência, conhecimento técnico, comunicação e perfil profissional
                    * não repita perguntas
                    * não faça mais de uma pergunta por resposta
                    * seja objetivo e profissional
                    * responda apenas com a próxima pergunta
                    * não use markdown
                    * não use listas
                    * não use títulos
                    * não explique seu raciocínio
                    
                    Validação do candidato:
                    
                    Considere inválido quando houver:
                    
                    * contradições relevantes entre respostas
                    * experiência incompatível com o conhecimento demonstrado
                    * respostas excessivamente genéricas que impossibilitem validar a experiência
                    * indícios de informações inventadas ou inconsistentes
                    
                    Enquanto a entrevista não tiver sido concluída:
                    
                    Responda apenas com a próxima pergunta.
                    
                    Quando a décima pergunta já tiver sido feita e respondida:
                    
                    1. Analise toda a entrevista.
                    2. Gere um resumo profissional curto do candidato.
                    3. Determine se o candidato é válido ou inválido.
                    4. Caso inválido, informe o motivo.
                    5. Não faça novas perguntas.
                    
                    Retorne exatamente neste formato:
                    
                    ENTREVISTA_FINALIZADA
                    
                    {
                    "status": "valido" ou "invalido",
                    "resumo": "resumo profissional curto baseado na entrevista completa",
                    "motivo_invalidacao": "motivo da inconsistência ou null"
                    }
                    
                    Importante:
                    
                    * o resumo deve ser baseado apenas nas informações fornecidas pelo candidato
                    * não invente experiências ou tecnologias
                    * o campo motivo_invalidacao deve ser null quando o candidato for válido
                    * após ENTREVISTA_FINALIZADA não deve existir nenhuma pergunta adicional
                    * retorne exatamente o formato especificado

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