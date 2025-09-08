# Bioinformatics Research Dashboard — Final Submission

This is the **final project package** for the 24‑hour Frontend + Backend challenge.

It includes:
- A **React frontend** with pages: Landing Page, Gene Expression Viewer, Variant Explorer, and About.
- A **Flask backend** serving APIs for gene expression datasets and VCF parsing.
- Integration with **Plotly** for data visualization.
- **Responsive design** using Tailwind.
- Bonus features: sidebar filters, gene search, log‑normalized toggle, loading spinner, and reusable layout components.

---

## Project Structure
```
Bioinformatics-dashboard-repo/
├── backend/
│   └── app.py                # Flask backend (datasets + VCF parsing)
├── src/
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── ui/
│       ├── Navbar.jsx        # Responsive navbar
│       ├── LandingPage.jsx   # Landing page
│       ├── ExpressionViewer.jsx # Gene expression visualization
│       ├── VariantExplorer.jsx  # VCF explorer & table
│       ├── AboutPage.jsx     # About section
│       └── Footer.jsx        # Footer with subscription box
├── index.html                # Vite template
├── tailwind.config.js        # Tailwind setup
├── package.json              # Frontend dependencies
├── requirements.txt          # Backend dependencies
└── README.md                 # (this file)
```

---

## Backend (Flask)

### Install & Run
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)
pip install -r requirements.txt
python app.py
```

Server runs at: **http://localhost:5000**

### API Endpoints
- `GET /api/datasets` → returns available datasets and metadata.
- `GET /api/expression/<dataset>` → returns rows of expression data `{sample,gene,condition,value}`.
- `POST /api/parse_vcf` → parse uploaded VCF file and return variant rows.

---

## Frontend (React + Vite)

### Install & Run
```bash
npm install
npm run dev
```

Dev server runs at: **http://localhost:5173**

### Build for Production
```bash
npm run build
```
This outputs a static build in `dist/` which Flask can serve.

---

## Features Implemented

### 1. Landing Page
- Navbar (Home, Expression Viewer, Variant Explorer, About)
- Hero section with CTA button
- Footer with subscription box

### 2. Gene Expression Viewer
- Dataset dropdown (fetched from backend)
- Gene input (manual + quick buttons)
- Condition filter checkboxes
- Log‑normalized toggle
- Boxplot visualization (Plotly)
- Responsive split layout + sidebar
- Loading indicator

### 3. Variant Explorer
- Upload VCF file (simulated parse in Flask)
- Table with Chromosome, Position, Ref, Alt, Impact, Gene
- Sorting, filtering by impact, pagination (frontend)
- “Annotate” button opens modal with variant info

### 4. Reusable Components
- Navbar with mobile menu
- Footer
- Modal
- Card components
- Dark mode toggle (optional)

### 5. Responsive Design
- Flexbox/Grid layouts
- Mobile‑first, tablet, desktop responsive
- Clean visual hierarchy
- Hover and tooltip effects

### 6. Bonus
- Sidebar for Expression Viewer
- Gene quick buttons
- Log‑normalized toggle
- Flask API for expression datasets
- Loading spinner when switching datasets

---

## Requirements

### Frontend
- React
- Vite
- Tailwind CSS
- Plotly.js

### Backend
- Flask

### Install dependencies
```bash
# Frontend
npm install

# Backend
pip install flask
```

---

## Screenshots (Demo)
- Landing page with CTA
- Expression Viewer (boxplots by gene/condition)
- Variant Explorer with VCF table

*(Attach screenshots or GIFs here for submission)*

---

## Submission
This package contains everything needed:
- Source code (React + Flask)
- README with setup instructions
- Backend & frontend integrated

👉 Ready for evaluation.

---

### Author
**Nalin Bahadkar** — Bioinformatics Dashboard 24‑Hour Challenge Submission
