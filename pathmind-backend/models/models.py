from sqlalchemy import Column, Integer, String, Float, JSON, Text
from database.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)

    # Profile fields (optional)
    age = Column(Integer, nullable=True)
    gender = Column(String(50), nullable=True)
    primary_interest = Column(String(150), nullable=True)
    secondary_interests = Column(JSON, nullable=True)   # list of strings
    short_term_goal = Column(Text, nullable=True)
    long_term_goal = Column(Text, nullable=True)
    strengths = Column(JSON, nullable=True)             # list of strings
    weaknesses = Column(JSON, nullable=True)            # list of strings
    education_level = Column(String(150), nullable=True)
    field_of_study = Column(String(150), nullable=True)
    graduation_year = Column(Integer, nullable=True)
    experience = Column(Text, nullable=True)
    projects = Column(JSON, nullable=True)              # list of project names/descriptions

    # AI / progress fields (managed by backend)
    last_score = Column(Float, nullable=True)
    last_rank_percentile = Column(Float, nullable=True)


class Mentor(Base):
    __tablename__ = "mentors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    role = Column(String(150))
    company = Column(String(150))
    expertise = Column(String(500))  # comma separated
    profileLink = Column(String(500))
    avatar = Column(String(500))


class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    type = Column(String(100))
    provider = Column(String(150))
    link = Column(String(500))
    duration = Column(String(100))
    category = Column(String(100), nullable=True)


class Progress(Base):
    __tablename__ = "progress"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    skill = Column(String(150))
    progress = Column(Float)


from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database.db import Base

class AnalysisResult(Base):
    __tablename__ = "analysis_results"
    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    score = Column(Float)
    rankPercentile = Column(Float)
    strengths = Column(JSON)
    weaknesses = Column(JSON)
    recommendations = Column(JSON)
    confidence = Column(Float)
    categoryScores = Column(JSON)

    user = relationship("User")


class QuizResult(Base):
    __tablename__ = "quiz_results"
    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    answers = Column(JSON, nullable=False)

    user = relationship("User")

