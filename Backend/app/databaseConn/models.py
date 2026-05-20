from sqlalchemy import Column, Integer, String, Text
from .connection import Base

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