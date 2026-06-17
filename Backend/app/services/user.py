from sqlalchemy.orm import Session
from app.schemas.user import (
    UserRegister,
    UserLogin
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from fastapi import HTTPException
from app.models.models import User
class UserService:
    def userRegister(user:UserRegister, db: Session):
        print(user.password)
        existing_user = db.query(User).filter(
        User.email == user.email
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        new_user = User(
            name=user.name,
            email=user.email,
            hashed_password=hash_password(
            user.password
        ))
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
        "message": "User created"
        }
    def userLogin(user:UserLogin, db:Session):
        db_user = db.query(User).filter(
            User.email == user.email
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