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
    return {"message": resposta}
    
    
