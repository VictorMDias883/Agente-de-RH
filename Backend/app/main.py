from fastapi import FastAPI

from app.databaseConn.connection import engine
from app.databaseConn.models import Base

app = FastAPI()

Base.metadata.create_all(
    bind=engine
)

@app.get("/")
def root():
    return {
        "message":"API Funcionando"
    }