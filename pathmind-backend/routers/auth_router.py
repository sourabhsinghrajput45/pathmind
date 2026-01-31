from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.models import User
from models.schemas import RegisterRequest, LoginRequest
import bcrypt

router = APIRouter()

@router.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    # check if user exists
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    # hash password
    hashed_password = bcrypt.hashpw(req.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = User(
        name=req.name,
        email=req.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registration successful",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name
        }
    }


@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # verify password
    if not bcrypt.checkpw(req.password.encode("utf-8"), user.password.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }
