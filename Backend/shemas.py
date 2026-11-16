from pydantic import BaseModel, ConfigDict
from typing import Optional

# --- SCHEMAS DE DOADOR ---
class DoadorCreate(BaseModel):
    razao_social: str
    nome_fantasia: Optional[str] = None
    cnpj: str
    responsavel: str
    telefone: str
    email: str

class DoadorResponse(BaseModel):
    id_doador: int
    razao_social: str
    nome_fantasia: Optional[str] = None
    cnpj: str
    responsavel: str
    telefone: str
    email: str
    ativo: bool

    model_config = ConfigDict(from_attributes=True)


# --- SCHEMAS DE LOCAL DE ATENDIMENTO ---
class LocalAtendimentoCreate(BaseModel):
    id_doador: int
    nome_local: str
    endereco: str
    latitude: float
    longitude: float
    referencia: Optional[str] = None

class LocalAtendimentoResponse(BaseModel):
    id_local: int
    nome_local: str
    endereco: str
    referencia: Optional[str] = None
    # Em vez de devolver apenas id_doador, devolvemos o nome/razão social compreensível
    doador_nome: str

    model_config = ConfigDict(from_attributes=True)