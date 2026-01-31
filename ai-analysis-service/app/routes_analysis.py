from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
from .ml_service import predict_analysis_from_answers
from .models import Result, Quiz, User

bp = Blueprint("analysis", __name__)

@bp.route("/run", methods=["POST"])
def run_analysis():
    """
    Accepts:
      { "user": "John", "quiz_id": 1 }
    OR
      { "user": "John", "answers": [...] }
    Returns AI analysis JSON and stores Result linked to quiz if quiz_id provided.
    """
    db = current_app.db
    payload = request.get_json() or {}
    user = payload.get("user", "Guest")
    answers = payload.get("answers")
    quiz_id = payload.get("quiz_id")

    session = db()

    try:
        # Fetch answers from DB if quiz_id is provided
        if quiz_id:
            q = session.query(Quiz).filter(Quiz.id == int(quiz_id)).first()
            if not q:
                return jsonify({"error": "quiz_id not found"}), 404
            answers = q.raw_answers

        if not answers:
            return jsonify({"error": "no answers provided"}), 400

        # Ensure answers is a list of dicts with 'questionId' and 'answer'
        if not isinstance(answers, list) or not all(isinstance(a, dict) and 'answer' in a for a in answers):
            return jsonify({
                "error": "answers must be a list of objects like {questionId, answer}"
            }), 400

        # Debug logs
        print(f"[DEBUG] User: {user}")
        print(f"[DEBUG] Answers sent to ML: {answers}")

        # Get AI analysis
        analysis = predict_analysis_from_answers(answers, user_name=user)

        # Store result if quiz_id is present
        if quiz_id:
            res = Result(
                quiz_id=quiz_id,
                analysis=analysis,
                created_at=datetime.utcnow().isoformat()
            )
            session.add(res)
            session.commit()

        return jsonify(analysis)

    except Exception as e:
        session.rollback()
        print(f"[ERROR] Exception in run_analysis: {e}")
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()
