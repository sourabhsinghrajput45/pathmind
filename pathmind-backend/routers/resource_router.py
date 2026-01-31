from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database.db import get_db
from models.models import Resource
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[dict])
def get_resources(
    categories: Optional[List[str]] = Query(None),
    limit: int = Query(20, ge=1),
    db: Session = Depends(get_db)
):
    query = db.query(Resource)

    if categories:
        query = query.filter(Resource.category.in_(categories))

    rows = query.limit(limit).all()

    return [
        {
            "id": r.id,
            "title": r.title,
            "type": r.type,
            "provider": r.provider,
            "link": r.link,
            "duration": r.duration,
            "category": r.category
        }
        for r in rows
    ]
