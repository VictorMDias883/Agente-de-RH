import shutil
import uuid
import asyncio
from app.databaseConn.connection import SessionLocal
from app.IaConn.request import Request
from app.IaConn.security.guardrail import messsageDetection
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
            invasive=messsageDetection(experience)
            if(invasive):
                return
            candidate = db.query(Candidate).filter(
                Candidate.id == candidate_id
            ).first()
            resumo_str = asyncio.run(Request.gerar_resumo(experience, text, candidate.vaga))
            
            
            
            
            if candidate:
                candidate.ai_analysis = resumo_str
                db.commit()
                db.refresh(candidate)
                print(f"Análise salva com sucesso para candidato", flush=True)
            else:
                print(f"Candidato não encontrado", flush=True)
        except Exception as e:
            print(f"Erro ao processar currículo: {e}", flush=True)
            db.rollback()
        finally:
            db.close()