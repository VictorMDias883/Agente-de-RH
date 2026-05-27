from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databaseConn.connection import get_db
from app.schemas.admin import (
    AdminRegister,
    AdminLogin
)
from app.services.admin import AdminService



router = APIRouter(
    prefix="/admin",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    user: AdminRegister,
    db: Session = Depends(get_db)
):
    return AdminService.adminRegister(user, db)
    
@router.post("/login")
def login(
    user: AdminLogin,
    db: Session = Depends(get_db)
):
    return AdminService.adminLogin(user, db)