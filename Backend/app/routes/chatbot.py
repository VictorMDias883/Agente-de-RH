from fastapi import APIRouter
from app.schemas.chatbot import ChatBot
router = APIRouter(
    prefix="/chat",
    tags=["Chatbot"]
)

@router.post("/mensagem")
def sendMessage(message: ChatBot):
    #todo
    return message