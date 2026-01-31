import random
from typing import Dict, Any
from utils.load_questions import check_answers

def analyze_with_rules(user: str, answers: Dict[str, str]) -> Dict[str, Any]:
    eval_res = check_answers(answers)
    score = eval_res["score"]
    category_scores = eval_res.get("categoryScores", [])
    
    # Sort categories by descending performance
    category_scores = sorted(category_scores, key=lambda x: x["value"], reverse=True)

    strengths = [c["category"] for c in category_scores if c["value"] >= 70]
    neutral = [c["category"] for c in category_scores if 40 <= c["value"] < 70]
    weaknesses = [c["category"] for c in category_scores if c["value"] < 40]

    # 🔥 Edge-case handling: Ensure at least one strength always exists
    if not strengths and category_scores:
        best_category = category_scores[0]
        strengths.append(best_category["category"])

        # Remove from weaknesses if mistakenly placed
        if best_category["category"] in weaknesses:
            weaknesses.remove(best_category["category"])

    # Limit lists for better UI experience
    strengths = strengths[:3]
    weaknesses = weaknesses[:3]

    # Recommendation builder
    recommendations = []
    for cat in weaknesses:
        recommendations.append(
            f"Focus more on {cat}: practice topic-wise quizzes and watch explainer videos."
        )
    for cat in neutral:
        recommendations.append(
            f"You're okay in {cat} — refine consistency with moderate practice."
        )
    for cat in strengths:
        recommendations.append(
            f"You're strong in {cat} — keep polishing by solving higher difficulty questions."
        )

    # Smart perception metrics
    rankPercentile = round(max(1, min(99, score + random.uniform(5, 15))), 2)
    confidence = round(max(35, min(95, score + random.uniform(10, 20))), 2)


    
    career_map = {
    "artificial intelligence": "AI Engineer / Researcher",
    "machine learning": "Machine Learning Engineer",
    "data science": "Data Scientist / Data Analyst",
    "cybersecurity": "Cybersecurity Analyst / Ethical Hacker",
    "blockchain": "Blockchain Developer / Web3 Specialist",
    "quantum computing": "Quantum Computing Researcher",
    "financial analysis": "Financial Analyst / Investment Strategist",
    "ethical hacking": "Ethical Hacker / Security Consultant",
    
    "technology": "Software Engineer / IT Specialist",
    "math": "Data Analyst / Statistician",
    "logic": "Backend Engineer / Cybersecurity Analyst",
    "analytical": "Business Intelligence Analyst",
    "business": "Product Manager / Business Consultant",
    "verbal": "Communication Specialist / Marketing",
    "general knowledge": "Government Exams / UPSC / Journalism",
    "soft skills": "HR / Client Relations / Leadership Roles",
    }

    career_path = "General Career Development Track"

    if strengths:
        for s in strengths:
            key = s.lower()
            if key in career_map:
                career_path = career_map[key]
                break

    

    return {
        "user": user,
        "score": score,
        "rankPercentile": rankPercentile,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations,
        "confidence": confidence,
        "categoryScores": category_scores,
        "careerPath": career_path

    }
