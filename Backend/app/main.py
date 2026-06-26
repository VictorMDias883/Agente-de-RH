import os

from fastapi import FastAPI
from app.routes.user import router as user_router
from app.routes.admin import router as admin_router
from app.routes.process import router as process_router
from app.routes.chatbot import router as chatbot_router
from app.databaseConn.connection import engine
from app.models.models import Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

cors_origins = [origin.strip() for origin in os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(
    bind=engine
)
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(process_router)
app.include_router(chatbot_router)
@app.get("/")
def root():
    return {
        "message":"API Funcionando"
    }