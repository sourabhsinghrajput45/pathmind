from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.models import User

router = APIRouter()

@router.get("/me")
def get_profile(userId: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == userId).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }
