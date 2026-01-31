import pandas as pd
import random
from typing import List, Dict

CSV_PATH = "utils/quiz_questions.csv"

def _load_df():
    df = pd.read_csv(CSV_PATH, encoding="latin1")

    # Normalize column names
    df.columns = (
        df.columns
        .str.replace("ï»¿", "", regex=False)  # Remove BOM
        .str.replace('"', '', regex=False)     # Remove double quotes
        .str.strip()
        .str.lower()
    )

    # Rename columns to match backend/data usage
    df = df.rename(columns={
        "options__001": "option_a",
        "options__002": "option_b",
        "options__003": "option_c",
        "options__004": "option_d",
        'id': 'id',  # Ensure final normalized id name
    })

    return df



def get_all_questions() -> List[Dict]:
    df = _load_df()
    return df.to_dict(orient="records")

def get_random_questions(limit: int = 5, difficulty: str = None, category: str = None):
    df = _load_df()
    if difficulty:
        df = df[df["difficulty"].str.lower() == difficulty.lower()]
    if category:
        df = df[df["category"].str.lower() == category.lower()]

    if df.empty:
        return []

    n = min(limit, len(df))
    df = df.sample(n=n, random_state=None).reset_index(drop=True)
    # hide answers before sending
    df_public = df.drop(columns=["answer"])
    # convert option columns to consistent names if needed
    return df_public.to_dict(orient="records")

def check_answers(user_answers: dict):
    df = _load_df() 
    total = 0
    correct = 0
    category_scores = {}

    for _, row in df.iterrows():
        qid = str(int(row["id"]))

        if qid in user_answers:
            total += 1
            correct_answer = str(row["answer"]).strip()
            user_answer = str(user_answers[qid]).strip()

            # Accept letters OR option text
            if user_answer.upper() in {"A", "B", "C", "D"}:
                mapping = {
                "A": str(row.get("option_a", "")).strip(),
                "B": str(row.get("option_b", "")).strip(),
                "C": str(row.get("option_c", "")).strip(),
                "D": str(row.get("option_d", "")).strip(),
                }
                is_correct = (
                    mapping[user_answer.upper()].lower() == correct_answer.lower()
                    or user_answer.upper() == correct_answer.upper()
                )
            else:
                is_correct = user_answer.lower() == correct_answer.lower()

            if is_correct:
                correct += 1
                cat = row["category"]
                category_scores[cat] = category_scores.get(cat, 0) + 1

    score = round((correct / total) * 100, 2) if total > 0 else 0

    category_scores_list = [
        {"category": k, "value": min(100, v * 20)}
        for k, v in category_scores.items()
    ]

    return {"score": score, "categoryScores": category_scores_list}
