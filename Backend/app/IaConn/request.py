import os
import json
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
                    Você é um recrutador técnico especializado em análise de currículos.

                    Analise o currículo e a experiência profissional enviados.

                    Sua tarefa é:

                    1. Criar um resumo profissional curto do candidato.
                    2. Identificar possíveis inconsistências, exageros, contradições ou informações suspeitas.
                    3. Gerar uma pergunta técnica ou comportamental baseada no perfil analisado.

                    Critérios de inconsistência:
                    - tecnologias incompatíveis com o tempo de experiência informado
                    - cargos incompatíveis com conhecimentos apresentados
                    - informações contraditórias
                    - experiências pouco críveis
                    - informações insuficientes para validar o perfil

                    Caso encontre inconsistências relevantes, marque o resumo como inválido.

                    Responda SOMENTE um JSON válido.

                    Estrutura obrigatória:

                    {
                        "status": "valido" ou "invalido",
                        "resumo": "resumo profissional curto",
                        "motivo_invalidacao": "motivo da inconsistência ou null",
                        "pergunta": "pergunta gerada para entrevista"
                    }

                    Regras:
                    - não use markdown
                    - não use blocos de código
                    - não use texto fora do JSON
                    - resumo com no máximo 700 caracteres
                    - pergunta com no máximo 200 caracteres
                    - não invente informações
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
            max_tokens=160
        )
        
        return response.choices[0].message.content