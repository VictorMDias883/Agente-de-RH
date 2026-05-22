from sqlalchemy import Column, Integer, String, Text
from ..databaseConn.connection import Base

class Candidate(Base):
    __tablename__ = "candidatos"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    phone = Column(String)
    experience = Column(Text)
    resume_path= Column(String, nullable=False)
    resume_filename = Column(String)
    ai_analysis = Column(Text)

class User(Base):
    __tablename__="users"

    id=Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    hashed_password = Column(String, nullable=False)

class Admin(Base):
    __tablename__="admins"
    id=Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    hashed_password = Column(String, nullable=False)