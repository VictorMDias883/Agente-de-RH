from fastapi import Depends

from app.IaConn.chatbot import Chat

from app.models.models import Candidate

from app.databaseConn.cacheConn import redis_client as r
import json
class chatService:
    def message(message, current_user, db):
        candidate = db.query(Candidate).filter(
            Candidate.candidateId  == current_user.id
        ).first()
        
        candidate_key= f"candidate:{candidate.candidateId}:messages"
        index_key = f"candidate:{candidate.candidateId}:index"
    
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
        if(index==10):
            resposta = Chat.responder(messages, candidate.ai_analysis)
        resposta = Chat.responder(messages, "")
        
        
        Iamessage={
            "index": index,
            "role":"assistant",
            "content":resposta
        }
        r.rpush(
            candidate_key,
            json.dumps(Iamessage)
        )
        if resposta.strip().startswith("ENTREVISTA_FINALIZADA"):
            messages = r.lrange(
                candidate_key,
                0,
                -1
            )
            messages =  [ json.loads(m)
                     for m in messages ]
            
            resposta = resposta.replace("ENTREVISTA_FINALIZADA", "")
            candidate.ai_analysis = resposta
            candidate.interview = json.dumps(messages)
            db.add(candidate)
            db.commit()
            db.refresh(candidate)
            
           
            r.delete(candidate_key)
            r.delete(index_key)
            
            
            resposta = resposta.strip()
            print(resposta)
            return {"message": "Essa entrevista foi finalizada, aguarde o email para a convocação para a entrevista final"}
        
        return {"message": resposta}