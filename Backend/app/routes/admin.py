from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import get_current_admin
from app.databaseConn.connection import get_db
from app.models.models import Admin
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

@router.get("/me")
def get_me(
    current_admin: Admin = Depends(get_current_admin)
):
    return {
        "message": "Admin access granted",
        "admin_email": current_admin.email
    }