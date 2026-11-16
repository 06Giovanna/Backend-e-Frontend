from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Doador(Base):
    __tablename__ = "doador"
    __table_args__ = {"schema": "atendimento_social"}

    id_doador = Column(Integer, primary_key=True, index=True)
    razao_social = Column(String, nullable=False)
    nome_fantasia = Column(String, nullable=True)
    cnpj = Column(String, nullable=False, unique=True)
    responsavel = Column(String, nullable=False)
    telefone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    ativo = Column(Boolean, default=True)


class LocalAtendimento(Base):
    __tablename__ = "local_atendimento"
    __table_args__ = {"schema": "atendimento_social"}

    # Mapeia 'id_local' no Python para 'id' no banco
    id_local = Column("id", Integer, primary_key=True, index=True)

    # Mapeia 'nome_local' no Python para 'nome' no banco
    nome_local = Column("nome", String, nullable=True)