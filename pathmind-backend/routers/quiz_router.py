from fastapi import APIRouter, Depends, Query, Body, HTTPException
from database.db import get_db 
from sqlalchemy.orm import Session
from models.models import AnalysisResult , QuizResult , User
from utils.load_questions import get_random_questions, check_answers

router = APIRouter()

@router.get("/get")
def get_quiz_questions(
    limit: int = Query(5, ge=1, le=20),
    difficulty: str = Query(None),
    category: str = Query(None)
):
    questions = get_random_questions(limit, difficulty, category)
    return {"count": len(questions), "questions": questions}

@router.post("/submit")
def submit_quiz(data: dict = Body(...), db: Session = Depends(get_db)):

    user_id = data.get("user_id")
    answers = data.get("answers")

    if not user_id:
        raise HTTPException(status_code=400, detail="Missing 'user_id'")

    if not isinstance(answers, dict):
        raise HTTPException(status_code=400, detail="'answers' must be an object")

    # Ensure valid user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Remove old quiz result for same user (latest only)
    db.query(QuizResult).filter(QuizResult.user_id == user_id).delete()

    # Save quiz answers
    db_record = QuizResult(
        user_id=user_id,
        answers=answers
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return {
        "message": "Quiz saved successfully",
        "saved": True,
        "quiz_id": db_record.id,
        "user_id": user_id,
        "answers": answers
    }


