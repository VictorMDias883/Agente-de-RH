from sqlalchemy.orm import Session
from datetime import datetime, timedelta, UTC
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.models.models import User
from app.databaseConn.connection import get_db
from app.core.config import (
    SECRET_KEY,
    ALGORITHM,
    ACESS_TOKEN_EXPIRE_MINUTES
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/candidate/login"
)
def hash_password(password: str):
    
    if isinstance(password, bytes):
        password = password.decode('utf-8')
    return pwd_context.hash(password)

def verify_password(
    plain_password,
    hashed_password
):
    
    if isinstance(plain_password, bytes):
        plain_password = plain_password.decode('utf-8')
    return pwd_context.verify(
        plain_password,
        hashed_password
    )

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(UTC) + timedelta(
        minutes=ACESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({
        "exp":expire
    })
    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
def get_current_user(token:str = Depends(oauth2_scheme), db:Session =  Depends(get_db)):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        email = payload.get("sub")
        if not email:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )
        
        user = db.query(User).filter(
            User.email ==email
        ).first()
        if not user:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )
        return user
    except JWTError:
        raise HTTPException(
                status_code=401,
                detail="invalid Token"
            )
