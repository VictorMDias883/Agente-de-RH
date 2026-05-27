from fastapi import FastAPI
from app.routes.user import router as user_router
from app.routes.admin import router as admin_router
from app.databaseConn.connection import engine
from app.models.models import Base
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
Base.metadata.create_all(
    bind=engine
)
app.include_router(user_router)
app.include_router(admin_router)
@app.get("/")
def root():
    return {
        "message":"API Funcionando"
    }