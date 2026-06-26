from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from ..databaseConn.connection import Base
from enum import Enum
from sqlalchemy  import Enum as SqlEnum
class Candidate(Base):
    __tablename__ = "candidatos"

    id = Column(Integer, primary_key=True, index=True)
    candidateId = Column(
        Integer,
        ForeignKey("users.id")
    ) 
    candidate = relationship("User")
    phone = Column(String)
    experience = Column(Text)
    vaga = relationship("Vagas")
    resume_path= Column(String, nullable=False)
    resume_filename = Column(String)
    ai_analysis = Column(Text)
    interview = Column(Text)

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

class Vagas(Base):
    __tablename__="vagas"
    id=Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    espec = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)