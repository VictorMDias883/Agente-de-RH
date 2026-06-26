from pydantic import BaseModel

class VagasRegister(BaseModel):
    name: str
    espec: str
    quantity: int

class VagasDelete(BaseModel):
    name:str

