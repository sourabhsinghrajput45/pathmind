# run this script once to seed the DB with mentors/resources and a sample user/progress
from database.db import SessionLocal
from models.models import Mentor, Resource, User, Progress
from utils.seed_data import MENTORS, RESOURCES
import bcrypt
from database.db import Base, engine  # add this line
Base.metadata.create_all(bind=engine)  # add this line to create table
def seed():
    db = SessionLocal()
    try:
        # Seed mentors
        for m in MENTORS:
            existing = db.query(Mentor).filter(Mentor.name == m["name"]).first()
            if not existing:
                mentor = Mentor(
                    name=m["name"],
                    role=m.get("role"),
                    company=m.get("company"),
                    expertise=m.get("expertise"),
                    profileLink=m.get("profileLink"),
                    avatar=m.get("avatar"),
                )
                db.add(mentor)

        # Seed resources
        for r in RESOURCES:
            existing = db.query(Resource).filter(Resource.title == r["title"]).first()
            if not existing:
                resource = Resource(
                    title=r["title"],
                    type=r.get("type"),
                    provider=r.get("provider"),
                    link=r.get("link"),
                    duration=r.get("duration"),
                    category=r.get("category"),
                )
                db.add(resource)

        # Create sample user
        existing_user = db.query(User).filter(User.email == "test@example.com").first()
        if not existing_user:
            hashed = bcrypt.hashpw("password123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            user = User(name="Test User", email="test@example.com", password=hashed)
            db.add(user)
            db.flush()
            # seed a few progress entries
            db.add(Progress(user_id=user.id, skill="Python", progress=80))
            db.add(Progress(user_id=user.id, skill="React", progress=65))
            db.add(Progress(user_id=user.id, skill="Data Structures", progress=50))

        db.commit()
        print("Seeded DB")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
