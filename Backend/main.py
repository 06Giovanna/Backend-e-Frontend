from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import shemas  # Nome ajustado para corresponder ao teu ficheiro shemas.py
from database import SessionLocal, engine

# Cria as tabelas na base de dados caso ainda não existam
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API - Sistema de Gestão Social",
    version="1.0.0"
)

# Injeção de dependência da sessão da base de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def inicio():
    return {"mensagem": "API de Gestão Social a funcionar!"}


# ==========================================
# ROTAS: DOADOR (Entidade Principal)
# ==========================================

@app.post("/doadores", response_model=shemas.DoadorResponse, status_code=201)
def criar_doador(doador: shemas.DoadorCreate, db: Session = Depends(get_db)):
    novo_doador = models.Doador(
        razao_social=doador.razao_social,
        nome_fantasia=doador.nome_fantasia,
        cnpj=doador.cnpj,
        responsavel=doador.responsavel,
        telefone=doador.telefone,
        email=doador.email
    )
    db.add(novo_doador)
    db.commit()
    db.refresh(novo_doador)
    return novo_doador

@app.get("/doadores", response_model=List[shemas.DoadorResponse])
def listar_doadores(db: Session = Depends(get_db)):
    return db.query(models.Doador).all()


# ==========================================
# ROTAS: LOCAL DE ATENDIMENTO (Chave Estrangeira)
# ==========================================

@app.post("/locais", response_model=shemas.LocalAtendimentoResponse, status_code=201)
def criar_local(local: shemas.LocalAtendimentoCreate, db: Session = Depends(get_db)):
    # 1. Valida se o Doador informado existe na base de dados
    doador_existente = (
        db.query(models.Doador)
        .filter(models.Doador.id_doador == local.id_doador)
        .first()
    )
    
    if not doador_existente:
        raise HTTPException(
            status_code=404,
            detail="Doador não encontrado"
        )

    # 2. Persiste o novo local
    novo_local = models.LocalAtendimento(
        id_doador=local.id_doador,
        nome_local=local.nome_local,
        endereco=local.endereco,
        latitude=local.latitude,
        longitude=local.longitude,
        referencia=local.referencia
    )
    db.add(novo_local)
    db.commit()
    db.refresh(novo_local)

    # 3. Define o nome do doador a ser exibido na resposta
    nome_doador = doador_existente.nome_fantasia or doador_existente.razao_social

    return {
        "id_local": novo_local.id_local,
        "nome_local": novo_local.nome_local,
        "endereco": novo_local.endereco,
        "referencia": novo_local.referencia,
        "doador_nome": nome_doador
    }

@app.get("/locais", response_model=List[shemas.LocalAtendimentoResponse])
def listar_locais(db: Session = Depends(get_db)):
    locais = db.query(models.LocalAtendimento).all()
    
    # Mapeia cada registo para incluir o nome legível do doador obtido via relacionamento ORM
    return [
        {
            "id_local": local.id_local,
            "nome_local": local.nome_local,
            "endereco": local.endereco,
            "referencia": local.referencia,
            "doador_nome": local.doador.nome_fantasia or local.doador.razao_social
        }
        for local in locais
    ]