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
    vaga: str = Form(""),
    curriculum: UploadFile=File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    text = ProcessService.saveCurriculumAndResume(curriculum)
    candidate = Candidate(candidateId=current_user.id,
                           phone = phone,
                           experience=experience,
                           vaga=vaga,
                           resume_path = text["filepath"],
                           resume_filename=text["filename"],
                           ai_analysis="",
                           interview="")
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
        "candidate_id":candidate.id,
        "message": "Processamento iniciado"
    }

@router.get("/status/{candidate_id}")
def get_status(
    candidate_id:int,
    db:Session = Depends(get_db)
):
    candidate = db.query(Candidate).filter(Candidate.id==candidate_id).first()
    if not candidate:
        return {"status":"not_found"}
    if not candidate.ai_analysis:
        return {"status":"processing"} 
    
    return{
        "status":"completed",
        "analysis":candidate.ai_analysis
    }   
    

