from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from database import SessionLocal
from models import User
from schemas import UserCreate, UserResponse


app = FastAPI()

password_hash = PasswordHash.recommended()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "SplitSmart API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = password_hash.hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user