# Strategy Interactive - Document Comparison Tool

A web-based application for comparing documents (PDF, Word, Images) to identify similarities and differences.

## Project Structure

```
strategy-interactive/
├── frontend/          # Next.js 14 + TypeScript + Tailwind CSS
│   └── src/
│       ├── app/       # Next.js app router
│       └── components/ # React components
├── backend/           # Python FastAPI
│   ├── main.py        # API endpoints
│   ├── document_processor.py  # Text extraction
│   ├── comparison_service.py  # Comparison logic
│   └── database.py    # Database models
└── .github/           # GitHub configuration
```

## Features

- **Document Upload**: Support for PDF, Word (.docx), and images (PNG, JPEG, TIFF)
- **Text Extraction**: Automatic text extraction using PyMuPDF, python-docx, and Tesseract OCR
- **Multi-level Comparison**:
  - Sentence by sentence
  - Paragraph by paragraph
  - Thematic analysis
- **Visual Results**: Side-by-side comparison with similarity highlighting

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Tesseract OCR (for image text extraction)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/documents/upload` | Upload a document |
| GET | `/api/documents` | List all documents |
| GET | `/api/documents/{id}` | Get document details |
| GET | `/api/documents/{id}/text` | Get full document text |
| POST | `/api/compare` | Compare two documents |
| DELETE | `/api/documents/{id}` | Delete a document |

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+
- **Document Processing**: PyMuPDF, python-docx, pytesseract
- **Database**: SQLite (development), PostgreSQL (production-ready)

## Future Enhancements

- [ ] Integration with local LLM (Ollama) for advanced analysis
- [ ] Vector embeddings for semantic search
- [ ] Multi-document comparison (50+ documents)
- [ ] User authentication
- [ ] Comparison history
