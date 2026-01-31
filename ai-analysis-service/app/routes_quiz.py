from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

bp = Blueprint("quiz", __name__)

@bp.route("/submit", methods=["POST"])
def submit_quiz():
    """
    Accept quiz submission JSON:
    {
      "user": "John Doe",
      "answers": [{"questionId":1,"answer":"A"}, ...]
    }
    Stores quiz and returns quiz_id.
    """
    db = current_app.db
    payload = request.get_json()
    user_name = payload.get("user") or "Anonymous"
    answers = payload.get("answers") or []

    # upsert user
    session = db()
    try:
        from .models import User, Quiz
        # find user or create
        user = session.query(User).filter(User.name == user_name).first()
        if not user:
            user = User(name=user_name)
            session.add(user)
            session.flush()
        quiz = Quiz(user_id=user.id, raw_answers=answers, created_at=datetime.utcnow().isoformat())
        session.add(quiz)
        session.commit()
        return jsonify({"status":"received", "quiz_id": quiz.id}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()
