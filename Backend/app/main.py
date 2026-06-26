import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from app.databaseConn.connection import engine
from app.models.models import Base
from app.routes.admin import router as admin_router
from app.routes.chatbot import router as chatbot_router
from app.routes.process import router as process_router
from app.routes.user import router as user_router
from app.routes.vagas import router as vagas_router

app = FastAPI()

cors_origins = [origin.strip() for origin in os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def ensure_vagas_schema() -> None:
    try:
        inspector = inspect(engine)
        if "vagas" not in inspector.get_table_names():
            Base.metadata.create_all(bind=engine)
            return

        columns = {column["name"] for column in inspector.get_columns("vagas")}

        with engine.begin() as connection:
            if "name" not in columns:
                connection.execute(text("ALTER TABLE vagas ADD COLUMN IF NOT EXISTS name VARCHAR"))
            if "espec" not in columns:
                connection.execute(text("ALTER TABLE vagas ADD COLUMN IF NOT EXISTS espec VARCHAR"))
            if "quantity" not in columns:
                connection.execute(text("ALTER TABLE vagas ADD COLUMN IF NOT EXISTS quantity INTEGER"))
    except Exception:
        pass


def ensure_candidate_schema() -> None:
    try:
        inspector = inspect(engine)
        if "candidatos" not in inspector.get_table_names():
            Base.metadata.create_all(bind=engine)
            return

        columns = {column["name"] for column in inspector.get_columns("candidatos")}

        with engine.begin() as connection:
            if "vaga" not in columns:
                connection.execute(text("ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS vaga VARCHAR"))
    except Exception:
        pass


ensure_vagas_schema()
ensure_candidate_schema()
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(process_router)
app.include_router(chatbot_router)
app.include_router(vagas_router)
@app.get("/")
def root():
    return {
        "message":"API Funcionando"
    }