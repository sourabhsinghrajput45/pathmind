from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from models.models import Mentor
from typing import List

router = APIRouter()

@router.get("/", response_model=List[dict])
def get_mentors(db: Session = Depends(get_db)):
    mentors = db.query(Mentor).all()
    out = []
    for m in mentors:
        out.append({
            "id": m.id,
            "name": m.name,
            "role": m.role,
            "company": m.company,
            "expertise": m.expertise.split(",") if m.expertise else [],
            "profileLink": m.profileLink,
            "avatar": m.avatar
        })
    return out
