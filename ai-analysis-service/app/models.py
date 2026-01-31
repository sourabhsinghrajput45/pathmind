from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from . import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=False)

    quizzes = relationship("Quiz", back_populates="user")

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    raw_answers = Column(JSON)  # store original answers as JSON
    created_at = Column(String(64))

    user = relationship("User", back_populates="quizzes")
    results = relationship("Result", back_populates="quiz")

class Result(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    analysis = Column(JSON)  # the analysis JSON returned
    created_at = Column(String(64))

    quiz = relationship("Quiz", back_populates="results")
