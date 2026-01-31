import fitz  # PyMuPDF
import pdfplumber
import re

def extract_skills_from_pdf_fitz(pdf_path):
    # Open the PDF file
    doc = fitz.open(pdf_path)

    # Initialize a variable to hold the entire extracted text
    full_text = ""
    
    # Iterate through all pages and extract text
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        full_text += page.get_text()

    # Regular expression pattern to find "Skills", "Tech Stack", etc.
    pattern = r"(Skills|Technology|Tech Stack|Skills and Technologies)(.*?)(?=(\n[A-Za-z]+|\n$))"
    
    # Find all matches
    matches = re.findall(pattern, full_text, flags=re.DOTALL)

    if matches:
        # Extract the first match
        skills_section = matches[0][1].strip()
        return skills_section
    else:
        return ""  # Return empty string if no skills section is found

def extract_skills_from_pdf_pdfplumber(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        # Iterate over each page in the PDF
        for page in pdf.pages:
            # Extract the table from the page
            tables = page.extract_tables()

            for table in tables:
                # Go through each row in the table
                for row in table:
                    # Assuming skills are in the left column (row[0]) and other details in the right column (row[1])
                    if row[0]:  # If the first column contains data
                        # Check if the row contains "skills" or "technology"
                        if re.search(r"(skills|technology|tech stack)", row[0], re.IGNORECASE):
                            skills_text = row[0]
                            return skills_text
    return ""  # Return empty string if no skills section is found

def extract_skills_from_pdf(pdf_path):
    # Try extracting skills using the PyMuPDF method first
    skills_text = extract_skills_from_pdf_fitz(pdf_path)
    
    # If the first method returns empty, use pdfplumber as a fallback
    if not skills_text:
        skills_text = extract_skills_from_pdf_pdfplumber(pdf_path)
    
    # If both methods fail to extract any skills
    if not skills_text:
        return "Skills/Tech Stack section not found."
    
    return skills_text
