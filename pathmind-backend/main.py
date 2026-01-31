from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import Base, engine
from routers import (
    auth_router,
    analysis_router,
    mentor_router,
    resource_router,
    progress_router,
    quiz_router,
    profile_router,
    user_router,
    
)

# create DB tables (SQLite)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PathMind Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","*"],  # your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)

app.include_router(auth_router.router, prefix="/api/auth", tags=["Auth"])
app.include_router(analysis_router.router, prefix="/api/analysis", tags=["AI Analysis"])
app.include_router(mentor_router.router, prefix="/api/mentors", tags=["Mentors"])
app.include_router(resource_router.router, prefix="/api/resources", tags=["Resources"])
app.include_router(progress_router.router, prefix="/api/progress", tags=["Progress"])
app.include_router(quiz_router.router, prefix="/api/quiz", tags=["Quiz"])
app.include_router(profile_router.router, prefix="/api/user", tags=["User"])
app.include_router(user_router.router, prefix="/api/user", tags=["User"])


@app.get("/")
def root():
    return {"message": "PathMind Backend Running 🚀"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=5000,  # Always run on port 5000
        reload=True
    )