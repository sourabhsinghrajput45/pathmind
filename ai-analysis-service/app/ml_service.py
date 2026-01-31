import os
import joblib
import numpy as np
from typing import List, Dict, Any
from .utils import derive_strengths_and_weaknesses, make_recommendations

MODEL_PATH = os.environ.get("AI_MODEL_PATH", "model.joblib")

# load model at import time (if exists)
_model = None
if os.path.exists(MODEL_PATH):
    _model = joblib.load(MODEL_PATH)

def ensure_model():
    global _model
    if _model is None:
        raise RuntimeError("Model not found. Train first (run train_model.py) and place model.joblib in project root or set AI_MODEL_PATH.")

def answers_to_feature_vector(answers: List[Dict]) -> np.ndarray:
    """
    Convert quiz answers list -> numeric feature vector for model.
    For simplicity we assume a maximum known question set; here we create a simple vector
    by sorting by questionId and filling missing with median (5).
    """
    # Example: assume questions ids 1..12
    max_q = 12
    vec = np.full((max_q,), 5.0)  # default mid value
    for a in answers:
        qid = int(a.get("questionId", 0))
        ans = a.get("answer")
        # normalize: if option string map to index, if numeric use directly
        if isinstance(ans, (int, float)):
            val = float(ans)
        else:
            # basic mapping for string options: hash -> small numeric [1..10]
            val = (abs(hash(str(ans))) % 10) + 1
        if 1 <= qid <= max_q:
            vec[qid-1] = val
    return vec.reshape(1, -1)

def predict_analysis_from_answers(answers: List[Dict], user_name: str = "User") -> Dict[str, Any]:
    ensure_model()
    x = answers_to_feature_vector(answers)
    # model predicts overall score and category scores (multioutput)
    y = _model.predict(x)  # shape (1, n_outputs)
    # design: first output is overall score 0-100, next outputs are category percentages
    overall_score = float(np.clip(y[0, 0], 0, 100))
    # assume next outputs correspond to 4 categories
    cat_vals = y[0, 1:1+4].tolist()
    # clamp
    cat_vals = [int(max(0, min(100, round(v)))) for v in cat_vals]
    categories = ["Logic", "Math", "Data Interpretation", "Memory"]
    category_scores = [{"category": c, "value": cat_vals[i] if i < len(cat_vals) else 50} for i,c in enumerate(categories)]
    strengths, weaknesses = derive_strengths_and_weaknesses(category_scores)
    recommendations = make_recommendations(weaknesses)

    # rankPercentile roughly from score
    rank = int(max(1, min(99, 100 - overall_score + 20)))  # simple mapping

    response = {
        "user": user_name,
        "score": int(round(overall_score)),
        "rankPercentile": rank,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations,
        "confidence": int(85 + (overall_score % 10)),  # synthetic
        "categoryScores": category_scores,
    }
    return response
