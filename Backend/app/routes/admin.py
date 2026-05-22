from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.databaseConn.connection import get_db

from app.models.models import Admin

from app.schemas.admin import (
    AdminRegister,
    AdminLogin
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/admin",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    user: AdminRegister,
    db: Session = Depends(get_db)
):
    db_user = db.query(Admin).filter(
        Admin.email == user.email
    ).first()
    if db_user:
        raise HTTPException(
            status_code=401,
            detail="Alredy Exists"
        )
    new_user = Admin(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(
            user.password
        )
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "Admin created"
    }
    
@router.post("/login")
def login(
    user: AdminLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(Admin).filter(
        Admin.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    password_valid = verify_password(
        user.password,
        db_user.hashed_password
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }