import os
from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, declarative_base

DB_PATH = os.environ.get("AI_DB", "sqlite:///ai_analysis.db")

Base = declarative_base()
engine = create_engine(DB_PATH, connect_args={"check_same_thread": False})
SessionLocal = scoped_session(sessionmaker(bind=engine))

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # import models so they get registered with Base
    from . import models
    Base.metadata.create_all(bind=engine)

    # register blueprints
    from .routes_quiz import bp as quiz_bp
    from .routes_analysis import bp as analysis_bp

    app.register_blueprint(quiz_bp, url_prefix="/api/quiz")
    app.register_blueprint(analysis_bp, url_prefix="/api/analysis")

    # expose DB session on app for convenience
    app.db = SessionLocal

    return app
