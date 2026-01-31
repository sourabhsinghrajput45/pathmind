import os
import google.generativeai as genai
from dotenv import load_dotenv
from try3 import extract_skills_from_pdf

# Load the environment variables from the .env file
load_dotenv()

# Configure the API key from environment variable
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
}

# Create the chat session
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=generation_config
)

# Add initial system message to set context
chat_session = model.start_chat(
    history=[
       
    ]
)
# Assuming chat_session is already initialized
chat_session.send_message(
    "Given a string of skills, technologies, and knowledge, provide answers to the following questions:\n\n"
    "1. Based on the skills and knowledge I have, which field should I choose? For example, should I pursue a career in technology, accounting, design, music, athletics, etc.?\n\n"
    "2. Based on the field suggested in the first answer, what specific jobs or career paths should I consider?\n\n"
    "3. How can I achieve the job or career path mentioned in the second answer?\n\n"
    "give only one recomendation 1:-just give tech or skills you are good in\n\n"
    "2:-2,3 suggested job by job name or role \n\n"
    "n\n"
    "answer in 2 small point only which i mentioned above \n\n" 
    " just answer in which skill shall work in one word\n\n" \
    "and 2 feilds according to my field"
)
pdf_path = 'resume-parser/SwayamDhamuniaResume.pdf'  # Update this path as per your file

# Extract the skills/tech stack text from the PDF
skill_text = extract_skills_from_pdf(pdf_path)
print("---------------------------------------")

if not skill_text:
    print("No skills/tech stack found in the PDF.")
    skill_text = "No skills found."


print(skill_text)
    
x=""

response = chat_session.send_message(
   skill_text
)
# Print the model's response
print(response.text)  # Assuming the response has the 'text' attribute

while (x.lower()!="exit"):
    x=input()
    if x.strip():
        response = chat_session.send_message(x)
    
    print(response.text)



