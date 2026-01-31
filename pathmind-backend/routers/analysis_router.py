from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database.db import get_db
from models.models import QuizResult, AnalysisResult
from utils.ai_logic import analyze_with_rules

router = APIRouter()


@router.post("/run-latest/{user_id}")
def run_latest_analysis(user_id: int, db: Session = Depends(get_db)):
    """
    Fetch latest quiz answers → analyze → save → return results
    """
    # Get most recent quiz for that user
    latest_quiz = (
        db.query(QuizResult)
        .filter(QuizResult.user_id == user_id)
        .order_by(QuizResult.id.desc())
        .first()
    )

    if not latest_quiz:
        raise HTTPException(status_code=404, detail="No quiz found for user")

    user_name = latest_quiz.user_id
    answers = latest_quiz.answers

    # Run AI rules logic
    result = analyze_with_rules(user_name, answers)

    # Save analysis to DB
    new_analysis = AnalysisResult(
        user_id=str(user_id),
        score=result["score"],
        rankPercentile=result["rankPercentile"],
        strengths=result["strengths"],
        weaknesses=result["weaknesses"],
        recommendations=result["recommendations"],
        confidence=result["confidence"],
        categoryScores=result["categoryScores"]
    )

    db.add(new_analysis)
    db.commit()
    db.refresh(new_analysis)

    print(f"🟢 Saved Analysis ID: {new_analysis.id}")

    return result


@router.get("/latest/{user_id}")
def get_latest_analysis(user_id: int, db: Session = Depends(get_db)):
    """
    Returns latest analysis result for user
    """
    latest = (
        db.query(AnalysisResult)
        .filter(AnalysisResult.user == str(user_id))
        .order_by(AnalysisResult.id.desc())
        .first()
    )

    if not latest:
        raise HTTPException(status_code=404, detail="No analysis found")

    return latest
