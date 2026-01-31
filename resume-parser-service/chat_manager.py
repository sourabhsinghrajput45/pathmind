import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel("gemini-2.0-flash")

# Do NOT pre-load context – we will add resume data dynamically
chat_session = None

def chat_with_ai(message: str, resume_context: dict):
    global chat_session

    if chat_session is None:
        # First time chat is called → initialize session with resume context
        chat_session = model.start_chat(history=[
            {
                "role": "user",
                "parts": [
                    "You are a career mentor. Base all analysis ONLY on the resume and AI evaluation provided."
                ]
            },
            {
                "role": "user",
                "parts": [
                    f"Here is the summary of the user's resume analysis: {resume_context}. "
                    "Use this for all future responses."
                ]
            }
        ])

    # Normal conversation
    response = chat_session.send_message(message)
    return response.text
