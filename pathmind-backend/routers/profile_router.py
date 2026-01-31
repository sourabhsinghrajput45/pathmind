from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from models.models import User
from models.schemas import ProfileUpdate
from typing import Dict

router = APIRouter()

@router.get("/me")
def get_my_profile(userId: int, db: Session = Depends(get_db)):
    """
    Query param: userId (from frontend localStorage)
    Example: GET /api/user/me?userId=1
    """
    user = db.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Build response dict
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "age": user.age,
        "gender": user.gender,
        "primary_interest": user.primary_interest,
        "secondary_interests": user.secondary_interests or [],
        "short_term_goal": user.short_term_goal,
        "long_term_goal": user.long_term_goal,
        "strengths": user.strengths or [],
        "weaknesses": user.weaknesses or [],
        "education_level": user.education_level,
        "field_of_study": user.field_of_study,
        "graduation_year": user.graduation_year,
        "experience": user.experience,
        "projects": user.projects or [],
        "last_score": user.last_score,
        "last_rank_percentile": user.last_rank_percentile,
    }

@router.put("/update")
def update_profile(userId: int, payload: ProfileUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = payload.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return {"message": "Profile updated", "user": user}