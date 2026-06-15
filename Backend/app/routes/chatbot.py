from fastapi import APIRouter
from app.schemas.chatbot import ChatBot
from app.IaConn.chatbot import Chat
router = APIRouter(
    prefix="/chat",
    tags=["Chatbot"]
)
messages = []
index=0
@router.post("/message")
def sendMessage(message: ChatBot):
    global index
    
    
    objMes = {
        "index": index,
        "role": "user",
        "content": message.message  
    }
    messages.append(objMes)
    index+=1
    resposta = Chat.responder(messages)
    if resposta.strip().startswith("ENTREVISTA_FINALIZADA"):
        resposta = resposta.replace("ENTREVISTA_FINALIZADA", "")
        resposta = resposta.strip()
        print(resposta)
        return {"message": "Essa entrevista foi finalizada, aguarde o email para a convocação para a entrevista final"}
    return {"message": resposta}
    
    
