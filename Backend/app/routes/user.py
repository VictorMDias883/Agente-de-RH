from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.databaseConn.connection import get_db

from app.schemas.user import (
    UserRegister,
    UserLogin
)
from app.services.user import UserService

router = APIRouter(
    prefix="/candidate",
    tags=["Authentication"]
)


@router.post("/register")
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    UserService.userRegister(user, db)
   

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    UserService.userLogin(user, db)