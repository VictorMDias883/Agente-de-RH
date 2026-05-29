from fastapi import Form, File, UploadFile, APIRouter, Depends, BackgroundTasks
from app.models.models import User, Candidate

from app.core.security import oauth2_scheme, get_current_user
from sqlalchemy.orm import Session
from app.databaseConn.connection import get_db
from app.services.process import ProcessService
from app.IaConn.request import Request

router = APIRouter(
    prefix="/process",
    tags=["Data Collection"]
)



@router.post("/register")
def register(
    background_tasks:BackgroundTasks,
    phone: str = Form(...),
    experience: str = Form(...),
    curriculum: UploadFile=File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    text = ProcessService.saveCurriculumAndResume(curriculum)
    candidate = Candidate(candidateId=current_user.id,
                           phone = phone,
                           experience=experience,
                           resume_path = text["filepath"],
                           resume_filename=text["filename"],
                           ai_analysis="")
    db.add(candidate)
    db.commit()
    db.refresh(candidate)
    background_tasks.add_task(
        ProcessService.process_resume,
        candidate.id,
        experience,
        text["text"]
    )
    return {
        "message": "Processamento iniciado"
    }
    
    

