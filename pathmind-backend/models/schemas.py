from pydantic import BaseModel,validator
from typing import List, Dict, Optional

class AnalysisRequest(BaseModel):
    user: str
    answers: Dict[str, str]

class CategoryScore(BaseModel):
    category: str
    value: float

class AnalysisResponse(BaseModel):
    user: str
    score: float
    rankPercentile: float
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]
    confidence: float
    categoryScores: List[CategoryScore]

class RegisterRequest(BaseModel):
    name: Optional[str]
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    primary_interest: Optional[str] = None
    secondary_interests: Optional[List[str]] = []
    short_term_goal: Optional[str] = None
    long_term_goal: Optional[str] = None
    strengths: Optional[List[str]] = []
    weaknesses: Optional[List[str]] = []
    education_level: Optional[str] = None
    field_of_study: Optional[str] = None
    graduation_year: Optional[int] = None
    experience: Optional[str] = None
    projects: Optional[List[str]] = []

    #  Convert empty string → None
    @validator(
        "name", "gender", "primary_interest",
        "short_term_goal", "long_term_goal",
        "education_level", "field_of_study",
        "experience",
        pre=True
    )
    def empty_string_to_none(cls, v):
        return None if v == "" else v

    #  Convert single string → list
    @validator("secondary_interests", "strengths", "weaknesses", "projects", pre=True)
    def ensure_list(cls, v):
        if v == "" or v is None:
            return []
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v