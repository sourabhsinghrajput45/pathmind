from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.models import Progress
from typing import List

router = APIRouter()

@router.get("/{user_id}", response_model=List[dict])
def get_progress(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(Progress).filter(Progress.user_id == user_id).all()
    out = [{"skill": r.skill, "progress": r.progress} for r in rows]
    if not out:
        # Return default sample metrics (so frontend chart has something)
        return [
            {"skill": "Python", "progress": 40},
            {"skill": "React", "progress": 30},
            {"skill": "Data Structures", "progress": 20}
        ]
    return out
