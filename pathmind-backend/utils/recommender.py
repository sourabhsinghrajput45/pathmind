import pandas as pd
from typing import List, Dict

MENTOR_CSV = None  # if you prefer loading from CSV, set path and use pd.read_csv
RESOURCE_CSV = None

# simple in-memory lookup using DB is preferred; seed_data.py populates DB
def recommend_resources_for_categories(categories: List[str], limit: int = 5) -> List[Dict]:
    # If you have resources.csv, uncomment and use it. For now this function will attempt DB lookup from SQLAlchemy
    # To keep this util independent, return an example empty list (routers/resource_router uses DB queries)
    return []

def recommend_mentors_for_categories(categories: List[str], limit: int = 5) -> List[Dict]:
    return []
