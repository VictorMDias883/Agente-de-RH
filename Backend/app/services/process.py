import shutil
import uuid
import asyncio
from app.databaseConn.connection import SessionLocal
from app.IaConn.request import Request
from app.models.models import Candidate
from fastapi import File
from pypdf import PdfReader
import os
UPLOAD_DIR = "upload"
class ProcessService:
    def saveCurriculumAndResume(curriculum:File):
        extension = curriculum.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{extension}"
        file_path = f"{UPLOAD_DIR}/{filename}"
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(curriculum.file, buffer)
        
        reader = PdfReader(file_path)
        text=""
        for page in reader.pages:
            text+=page.extract_text()
        return {"filepath":file_path,"filename":filename, "text":text}
    def process_resume(
            candidate_id:int,
            experience:str,
            text:str
    ):
        db = SessionLocal()
        try:
            
            resumo = asyncio.run(Request.gerar_resumo(experience, text))
            print(f"Resumo gerado: {resumo}")
            
            candidate = db.query(Candidate).filter(
                Candidate.id == candidate_id
            ).first()
            
            if candidate:
                candidate.ai_analysis = resumo
                db.commit()
                db.refresh(candidate)
                print(f"Análise salva com sucesso para candidato {candidate_id}")
            else:
                print(f"Candidato {candidate_id} não encontrado")
        except Exception as e:
            print(f"Erro ao processar currículo: {e}")
            db.rollback()
        finally:
            db.close()