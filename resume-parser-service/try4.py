import fitz  # PyMuPDF
import pdfplumber
import pytesseract
from PIL import Image
import os
import re

# Set Tesseract path (if not already in your PATH)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


# Function to capture a PDF page as an image
def capture_pdf_page(pdf_path, page_number=0, output_image_path=None):
    # Open the PDF file
    pdf_document = fitz.open(pdf_path)

    # Select the page to capture
    page = pdf_document.load_page(page_number)  # page_number starts from 0

    # Render the page to a pixmap (image)
    pix = page.get_pixmap()

    # Convert pixmap to a Pillow Image (RGB format)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

    # If no output path is specified, save the image in the same folder as the PDF
    if not output_image_path:
        output_image_path = os.path.join(os.path.dirname(pdf_path), f"page_{page_number + 1}.png")

    # Save the image
    img.save(output_image_path)
    print(f"Screenshot saved as: {output_image_path}")
    return output_image_path  # Return the image path for further use


# Function to extract text from an image using Tesseract OCR
def extract_text_from_image(image_path):
    # Open the image file using Pillow
    img = Image.open(image_path)

    # Use Tesseract to extract text
    text = pytesseract.image_to_string(img)

    return text


# Function to extract content under specific headings like "Technical Skills", "Skills", etc.
def extract_skills(text):
    # Define possible headings for technical skills
    headings = [
        "Technical Skills", "Skills", "Tech Stack", "Tech Skills", "Technologies", "Skills & Tools",
        "Expertise", "Core Competencies"
    ]
    
    # Combine all headings into a single regex pattern
    pattern = r"(?i)^\s*(" + "|".join(headings) + r")\s*[:\-]?\s*(.*?)\n\s*(?=\S)"
    
    # Compile the regular expression
    regex = re.compile(pattern, re.DOTALL | re.MULTILINE)

    # Search the text for matches
    matches = regex.findall(text)

    # Extract the skill content from the matches
    skills = []
    for match in matches:
        skills.append(match[1].strip())

    return skills


# Function to extract skills from the PDF using OCR after taking a screenshot
def extract_skills_from_pdf_via_screenshot(pdf_path, page_number=0):
    # Step 1: Capture the PDF page as an image
    image_path = capture_pdf_page(pdf_path, page_number=page_number)

    # Step 2: Extract text from the captured image using Tesseract
    text = extract_text_from_image(image_path)

    # Step 3: Extract skills from the extracted text
    skills = extract_skills(text)

    if skills:
        return skills  # Return extracted skills/tech stack
    else:
        return "No skills/tech stack found."  # Return message if no skills section is found


# Function to extract skills from the PDF using PyMuPDF (text extraction)
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
    pattern = r"(PROJECTS|TECHNICAL SKILLS|Skills|Technology|Tech Stack|Skills and Technologies|Core Competencies|Expertise)(.*?)(?=(\n[A-Za-z]+|\n$))"
    matches = re.findall(pattern, full_text, flags=re.DOTALL)

    if matches:
        # Extract the first match
        skills_section = matches[0][1].strip()
        return skills_section
    else:
        return ""  # Return empty string if no skills section is found


# Function to extract skills from the PDF using pdfplumber (table extraction)
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
                        if re.search(r"(skills|technology|tech stack|TECHNICAL SKILLS)", row[0], re.IGNORECASE):
                            skills_text = row[0]
                            return skills_text
    return ""  # Return empty string if no skills section is found


# Function to combine all methods and extract skills from the PDF
def extract_skills_from_pdf(pdf_path):
    # Try extracting skills using the PyMuPDF method first
    skills_text = extract_skills_from_pdf_fitz(pdf_path)
    
    # If the first method returns empty, use pdfplumber as a fallback
    if not skills_text:
        skills_text = extract_skills_from_pdf_pdfplumber(pdf_path)
    
    # If both methods fail to extract any skills
    if not skills_text:
        skills_text=extract_skills_from_pdf_via_screenshot(pdf_path, page_number=0)
    
    return skills_text


# if __name__ == '__main__':
#     pdf_path = 'SourabhSinghRajputResume.pdf'  # Replace with your PDF file path

#     # Call the function to extract skills from the screenshot method
#     skills_via_screenshot = extract_skills_from_pdf_via_screenshot(pdf_path, page_number=0)

#     # Print the extracted skills or tech stack
#     print("Skills/Tech Stack Extracted (via Screenshot): \n")
#     print(skills_via_screenshot)

#     # You can also use the other methods for extracting skills directly from the PDF:
#     # skills_from_pdf = extract_skills_from_pdf(pdf_path)
#     # print("\nSkills/Tech Stack Extracted (via Text Extraction): \n")
#     # print(skills_from_pdf)
