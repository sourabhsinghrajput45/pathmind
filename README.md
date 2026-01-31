# PathMind

## Overview

PathMind is a personal project focused on building an AI-assisted career guidance platform using a modern, service-oriented architecture. The system analyzes user-provided data such as resumes and basic profile information to generate career-related insights through backend APIs and AI-based analysis.

The project emphasizes clear separation between frontend, backend services, and AI processing, and is intended as a hands-on implementation of full-stack and AI integration concepts.

---

## Tech Stack

Frontend:
- React
- TypeScript
- HTML
- CSS

Backend Services:
- FastAPI – Authentication and core APIs
- FastAPI – Resume parsing service
- Flask – AI analysis service

Database:
- MySQL

Communication:
- REST APIs
- JSON over HTTP

---

## Project Structure

PathMind/
├── pathmind-frontend/          React + TypeScript frontend  
├── pathmind-backend/           FastAPI backend (authentication, APIs)  
├── resume-parser-service/      FastAPI service for resume parsing  
├── ai-analysis-service/        Flask service for AI-based analysis  
└── README.md  

---

## Implemented Features

- User authentication handled through backend APIs
- Resume upload and parsing with support for PDF and DOCX formats
- Extraction of basic skills and profile-related information
- AI-based analysis of user data
- Generation of career-related insights based on analysis results
- Frontend interface to interact with all backend services

---

## System Architecture

- React frontend communicates with backend services using REST APIs
- Each backend service runs independently
- Persistent data storage is handled using MySQL
- AI processing logic is isolated in a dedicated Flask service

---

## Setup Instructions

Prerequisites:
- Node.js
- Python 3.10 or higher
- MySQL

Frontend setup:
Navigate to the pathmind-frontend directory, install dependencies using npm, and start the development server using npm run dev.

Backend (FastAPI) setup:
Navigate to the pathmind-backend directory, create and activate a Python virtual environment, install dependencies from requirements.txt, and start the server using uvicorn.

Resume parser service setup:
Navigate to the resume-parser-service directory, create and activate a Python virtual environment, install dependencies, and start the FastAPI server using uvicorn.

AI analysis service setup:
Navigate to the ai-analysis-service directory, create and activate a Python virtual environment, install dependencies, and run the Flask application.

---

## Database Configuration

- MySQL is used to store user and resume-related data
- Database connection details are configured using environment variables
- Database schema and tables are managed by backend services

---

## Notes

- This project follows a modular, service-based backend design rather than a monolithic server
- AI logic is intentionally separated from core application logic
- The project is built as a personal learning and experimentation initiative

---
