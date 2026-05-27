from fastapi import Form, File, UploadFile, APIRouter
import shutil
router = APIRouter(
    prefix="/process",
    tags=["Data Collection"]
)
UPLOAD_DIR = "uploads"
@router.post("/register")
def register(
    phone: str = Form(...),
    experience: str = Form(...),
    curriculum: UploadFile=File(...)
):
    file_path = f"{UPLOAD_DIR}/{curriculum.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(curriculum.file, buffer)
    
    return {
        "message":"Arquivo Salvo",
        "path": file_path
    }