import google.generativeai as genai
import os
from dotenv import load_dotenv
import json
import re

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel("gemini-2.0-flash")


def extract_json(text: str):
    # Extract any JSON substring in the AI output
    match = re.search(r"\{[\s\S]*\}", text)
    if match:
        try:
            return json.loads(match.group(0))
        except:
            return {}
    return {}


def analyze_resume_text(skills: str):
    prompt = f"""
You MUST respond **ONLY** with a JSON object and nothing else.
No explanations. No markdown. No extra text.

Use exactly this structure:

{{
  "recommended_field": "one word only",
  "strong_skills": ["skill1", "skill2"],
  "top_roles": ["role1", "role2"],
  "improvement_plan": ["point1", "point2", "point3"]
}}

Resume text:
{skills}
"""

    response = model.generate_content(prompt)

    # Try extracting JSON safely
    result = extract_json(response.text)
    if not result:
        return {
            "recommended_field": "Unknown",
            "strong_skills": [],
            "top_roles": [],
            "improvement_plan": ["Could not parse AI output"]
        }

    return result
