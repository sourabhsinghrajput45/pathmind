from typing import List, Dict

# map category scores to strengths/weaknesses heuristics
def derive_strengths_and_weaknesses(category_scores: List[Dict]) -> (List[str], List[str]):
    strengths = []
    weaknesses = []
    for cat in category_scores:
        if cat["value"] >= 80:
            strengths.append(cat["category"])
        elif cat["value"] <= 60:
            weaknesses.append(cat["category"])
    # map categories to readable skill phrases (optional)
    return strengths, weaknesses

def make_recommendations(weaknesses: List[str]) -> List[str]:
    recs = []
    for w in weaknesses:
        recs.append(f"Practice targeted exercises in {w} (daily 20-30 mins).")
    if not recs:
        recs.append("Keep practicing mixed problems to maintain performance.")
    return recs
