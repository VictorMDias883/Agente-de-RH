from app.schemas.vagas import VagasRegister, VagasDelete
from sqlalchemy.orm import Session
from app.models.models import Vagas
class VagasService:
    def VagasRegister(data:VagasRegister, db: Session):
        db_vaga = db.query(Vagas).filter(
            Vagas.name == data.name
        ).first()
        if db_vaga:
            return VagasService.VagasUpdateS(vaga=db_vaga, db=db, data=data)
        newVaga = Vagas(
            name=data.name,
            espec = data.espec,
            quantity= data.quantity
        )
        db.add(newVaga)
        db.commit()
        db.refresh(newVaga)
        return {
            "message":"Vaga criada"
        }
    def VagasUpdateS(vaga:Vagas, db:Session, data:VagasRegister):
        vaga.espec=data.espec
        vaga.quantity=data.quantity
        db.commit()
        db.refresh(vaga)
        return {"Message": "Vaga atualizada com sucesso"}
    
    def VagasDelete(data:VagasDelete, db: Session):
        db_vaga = db.query(Vagas).filter(
            Vagas.name == data.name
        ).first()
        if db_vaga:
            db.delete(db_vaga)
            db.commit()
            return {"message":"deletado com sucesso"}
        return {"message":"não foi encontrado a vaga"}