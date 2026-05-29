import os

from dotenv import load_dotenv
from groq import AsyncGroq
load_dotenv()
class Request:
    
    client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))
    @staticmethod
    async def gerar_resumo(experiencia:str, curriculo:str):

        response = await Request.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                    {
                        "role": "system",
                        "content": """
                        Você é um recrutador técnico experiente especializado em análise de currículos.
                
                        Sua tarefa é:
                        - analisar o currículo e a experiência enviada
                        - identificar habilidades técnicas e comportamentais
                        - destacar senioridade aparente
                        - identificar tecnologias dominadas
                        - identificar experiências relevantes
                        - apontar diferenciais importantes
                        - resumir o perfil profissional do candidato
                
                        Regras IMPORTANTES:
                        - escreva de forma curta e objetiva
                        - máximo de 700 caracteres
                        - não use markdown
                        - não use listas
                        - não use emojis
                        - não use títulos
                        - não use formatação
                        - escreva tudo em texto puro
                        - gere apenas o resumo final
                        - não invente informações que não existam no currículo
                        - mantenha linguagem profissional e técnica
                        """
                    },
                    {
                        "role": "user",
                        "content": f"""
                        EXPERIÊNCIA:
                        {experiencia}
                
                        CURRÍCULO:
                        {curriculo}
                        """
                    }
                ],
            temperature=0.8,
            max_tokens=120
        )
        return response.choices[0].message.content