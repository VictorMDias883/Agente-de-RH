from fastapi import Depends

from app.IaConn.chatbot import Chat
from app.IaConn.resumer import Resumer
from app.models.models import Candidate
from app.IaConn.security.guardrail import messsageDetection
from app.databaseConn.cacheConn import redis_client as r
import json
class chatService:
    def message(message, current_user, db):
        candidate = db.query(Candidate).filter(
            Candidate.candidateId  == current_user.id
        ).first()
        if not candidate: 
            raise Exception("Candidate not found")
        candidate_key= f"candidate:{candidate.candidateId}:messages"
        index_key = f"candidate:{candidate.candidateId}:index"
        invasive = messsageDetection(message.message)
        if invasive:
            return {"message":"mensagem invasiva detectada, candidato sendo eliminado"}
        index = r.incr(index_key) - 1
        objMes = {
            "index": index,
            "role": "user",
            "content": message.message  
        }
        r.rpush(
            candidate_key,
            json.dumps(objMes)
        )
        messages = r.lrange(
            candidate_key,
            0,
            -1
        )
        messages =  [ json.loads(m)
                     for m in messages ]
        print(index)
        if(index==10):
            resposta = Resumer.responder(messages, candidate.ai_analysis)
            print(candidate.ai_analysis)
            candidate.ai_analysis = resposta
            candidate.interview = json.dumps(messages)
            print(resposta)
            print(messages)
            try:
                db.add(candidate)
                db.commit()
                db.refresh(candidate)
            except Exception as e:
                db.rollback()
                print("ERRO AO SALVAR NO BANCO:", e)
                raise
            messages = r.lrange(
                candidate_key,
                0,
                -1
            )
            messages =  [ json.loads(m)
                     for m in messages ]  
            r.delete(candidate_key)
            r.delete(index_key)
            resposta = resposta.strip()
            return {"message": "Essa entrevista foi finalizada, aguarde o email para a convocação para a entrevista final"}
        else:
            resposta = Chat.responder(messages)
        
        
        Iamessage={
            "index": index,
            "role":"assistant",
            "content":resposta
        }
        r.rpush(
            candidate_key,
            json.dumps(Iamessage)
        )
        return {"message": resposta}