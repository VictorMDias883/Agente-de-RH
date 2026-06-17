from fastapi import APIRouter, Depends
from app.schemas.chatbot import ChatBot
from app.services.chatbot import chatService
from app.core.security import get_current_user
from sqlalchemy.orm import Session
from app.databaseConn.connection import get_db
from app.models.models import User
router = APIRouter(
    prefix="/chat",
    tags=["Chatbot"]
)

@router.post("/message")
def sendMessage(
    message: ChatBot, current_user:User = Depends(get_current_user), db:Session = Depends(get_db)):
   return chatService.message(message, current_user, db)
    
    
