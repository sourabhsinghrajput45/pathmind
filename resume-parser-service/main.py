import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from resume_analysis import analyze_resume_text
from chat_manager import chat_with_ai
from try3 import extract_skills_from_pdf

app = FastAPI()
UPLOAD_FOLDER = "uploads"
latest_resume_analysis = None

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*",  # TEMPORARY: allow all (remove in production)
]
# CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    global latest_resume_analysis

    # save + extract
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    skills = extract_skills_from_pdf(file_path)

    result = analyze_resume_text(skills)

    # 🔥 store resume analysis for chat
    latest_resume_analysis = result

    return result



@app.post("/chat")
async def chat(message: dict):
    global latest_resume_analysis

    if latest_resume_analysis is None:
        return {"error": "Please analyze your resume first before chatting."}

    user_msg = message.get("message", "").strip()
    if not user_msg:
        return {"error": "Message missing"}

    reply = chat_with_ai(user_msg, latest_resume_analysis)
    return {"reply": reply}

