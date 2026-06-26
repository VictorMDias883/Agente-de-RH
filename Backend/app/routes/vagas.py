from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.vagas import VagasRegister, VagasDelete
from app.databaseConn.connection import get_db
from app.services.vagas import VagasService
from app.models.models import Vagas


router = APIRouter(
    prefix="/vagas",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    data: VagasRegister,
    db: Session = Depends(get_db)
):
    return VagasService.VagasRegister(data, db)
    
@router.delete("/delete")
def deleteVaga(
    data: VagasDelete,
    db: Session = Depends(get_db)
):
    return VagasService.VagasDelete(data, db)

@router.get("/list")
def listarVagas(db:Session = Depends(get_db)):
    return db.query(Vagas).all()