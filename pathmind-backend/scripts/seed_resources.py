from database.db import SessionLocal
from models.models import Resource

resources_data = [
    # Technology
    {
        "title": "Computer Networks for Beginners",
        "type": "Course",
        "provider": "Coursera",
        "link": "https://www.coursera.org/specializations/computer-networks",
        "duration": "Beginner",
        "category": "Technology",
    },
    {
        "title": "What is Cyber Security?",
        "type": "YouTube",
        "provider": "Simplilearn",
        "link": "https://youtu.be/2kJm_DNL0TU",
        "duration": "45 min",
        "category": "Technology",
    },

    # General Knowledge
    {
        "title": "General Awareness for Competitive Exams",
        "type": "Course",
        "provider": "Unacademy",
        "link": "https://unacademy.com",
        "duration": "3 hours",
        "category": "General Knowledge",
    },

    # Math
    {
        "title": "Quantitative Aptitude Fast Track",
        "type": "Course",
        "provider": "Udemy",
        "link": "https://www.udemy.com/topic/quantitative-aptitude/",
        "duration": "6 hours",
        "category": "Math",
    },

    # Logic
    {
        "title": "Logical Reasoning Tricks",
        "type": "Video",
        "provider": "YouTube",
        "link": "https://youtu.be/qs90ZwqjKu8",
        "duration": "60 min",
        "category": "Logic",
    },

    # Verbal
    {
        "title": "English Grammar for Interviews",
        "type": "Course",
        "provider": "edX",
        "link": "https://www.edx.org/",
        "duration": "Beginner",
        "category": "Verbal",
    },

    # Analytical
    {
        "title": "Analytical Ability Practice",
        "type": "Free Exercises",
        "provider": "IndiaBix",
        "link": "https://www.indiabix.com/logical-reasoning/",
        "duration": "Self-paced",
        "category": "Analytical",
    },
]

def seed_resources():
    db = SessionLocal()
    try:
        for res in resources_data:
            db.add(Resource(**res))
        db.commit()
        print("Database seeded successfully with learning resources!")
    except Exception as e:
        db.rollback()
        print("Error:", e)
    finally:
        db.close()


if __name__ == "__main__":
    seed_resources()
