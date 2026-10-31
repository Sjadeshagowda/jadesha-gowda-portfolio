# Jadesha Gowda — Developer Portfolio

A modern, high-performance, accessible personal portfolio website for **S Jadesha Gowda** (Aspiring Software Engineer, AI/ML Engineer, and ServiceNow Developer).

Engineered following front-end design standards inspired by **Brittany Chiang, Linear, and Vercel** — featuring a deep navy/charcoal aesthetic, electric indigo accents, responsive two-column hero layout with actual profile photograph, downloadable resume PDF, accessible modal dialogs, and dynamic Chart.js analytics.

---

## 📁 Repository Structure

```text
portfilo/
├── index.html                   # Semantic HTML5 structure (Hero 2-col, 9 sections, Credly badges)
├── styles.css                   # Custom CSS design system (8px grid, dark/light themes, animations)
├── script.js                    # Pure Vanilla JavaScript controller (modals, filters, Chart.js)
├── netlify.toml                 # Netlify deployment & security headers configuration
├── README.md                    # Deployment guide and documentation
└── assets/
    ├── Jadesha_Gowda_Resume.pdf # Actual Resume PDF (downloadable)
    ├── resume (2).pdf           # Original uploaded resume file preserved
    ├── resume.pdf               # Website alias for resume
    ├── profile.jpeg             # Original uploaded profile photograph preserved
    ├── icons/                   # Icon assets
    └── images/
        ├── jadesha-profile.jpg  # Actual profile photograph used across Hero & About sections
        ├── profile.jpg          # Profile photograph alias
        ├── stss.png             # Live Smart Tourist Safety System dashboard screenshot
        ├── stss (2).png         # STSS map and geofence interface screenshot
        ├── stss3.png            # STSS mobile SOS screen screenshot
        ├── stss4.png            # STSS administrative management view screenshot
        ├── cattlelens-preview.svg # CattleLens AI deep learning preview
        ├── parking-preview.svg  # ServiceNow Parking System preview
        ├── ev-charging-preview.svg # EV Charging System Spring Boot preview
        ├── phishing-preview.svg # CyberSecure '25 Hackathon tool preview
        └── favicon.svg          # Modern JG electric indigo brand monogram favicon
```

---

## 🚀 Local Development & Testing

You do not need to install complex build tools (no npm, webpack, or Node.js build step is required).

### Method 1: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Select **File &rarr; Open Folder...** and choose this `portfilo` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if you haven't already.
4. Right-click `index.html` in the file explorer and click **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500`.

### Method 2: Python HTTP Server
Run this single command inside the folder:
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Method 3: Node.js `npx serve`
```bash
npx serve .
```

---

## 🌐 Netlify Deployment Guide

### Option A: GitHub Continuous Deployment (Recommended)
This method enables automatic re-deployments whenever you push code changes to GitHub.

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Update portfolio: actual photo, real resume, and Credly certifications"
   git branch -M main
   git remote add origin https://github.com/sjadeshagowda/<your-repo-name>.git
   git push -u origin main
   ```
2. **Connect to Netlify:**
   - Go to [Netlify.com](https://app.netlify.com) and log in.
   - Click **"Add new project"** &rarr; **"Import an existing project"**.
   - Select **GitHub** and authorize access to your new repository.
3. **Configure Build Settings:**
   - **Branch to deploy**: `main`
   - **Build command**: *(leave completely empty)*
   - **Publish directory**: `.` (or root directory containing `index.html`)
4. **Deploy Site:**
   - Click **"Deploy site"**.
   - Netlify will provision your site in seconds and provide a public URL (e.g., `https://jadeshagowda.netlify.app`).

---

### Option B: Manual Drag-and-Drop Deployment (Under 60 Seconds)
If you do not want to set up Git right now, you can deploy manually:

1. Log in to [Netlify](https://app.netlify.com).
2. Go to the **Sites** tab.
3. Scroll down to the section that says **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**.
4. Drag your entire `portfilo` folder and drop it into the designated drop zone.
5. Netlify will upload the static files immediately and assign a live URL.

---

## 🎖️ Certifications Index (11 Total)

### Credly-Verified Credentials & PDF Certificates (4 Badges)
1. **ServiceNow Certified Application Developer (CAD)**
   - Issuer: ServiceNow
   - Issue Date: June 27, 2026
   - Certificate PDF: `assets/certificates/ServiceNow_CAD.pdf` (View & Download supported)
   - Credential ID: `9bd5af7c-5ec7-4bea-887b-e8f093086d5a`
   - Verification: [Verify CAD on Credly](https://www.credly.com/badges/9bd5af7c-5ec7-4bea-887b-e8f093086d5a/public_url)
2. **ServiceNow Certified System Administrator (CSA)**
   - Issuer: ServiceNow
   - Issue Date: July 1, 2026
   - Certificate PDF: `assets/certificates/ServiceNow_CSA.pdf` (View & Download supported)
   - Credential ID: `ae994f9f-8c34-4783-9406-5897d365fc89`
   - Verification: [Verify CSA on Credly](https://www.credly.com/badges/ae994f9f-8c34-4783-9406-5897d365fc89/public_url)
3. **AWS Cloud Quest: Cloud Practitioner — Training Badge**
   - Issuer: Amazon Web Services Training and Certification
   - Issue Date: April 2026
   - Credential ID: `cbca3e05-fd60-4a63-8a25-a37e69fac1c4`
   - Verification: [Verify AWS Cloud Quest on Credly](https://www.credly.com/badges/cbca3e05-fd60-4a63-8a25-a37e69fac1c4/public_url)
   - *Note: Training badge, distinct from the AWS Certified Cloud Practitioner certification.*
4. **Micro-Certification — Welcome to ServiceNow**
   - Issuer: ServiceNow
   - Issue Date: May 2026
   - Credential ID: `54f1454a-0646-404f-b0fe-9c56959e6338`
   - Verification: [Verify Welcome to ServiceNow on Credly](https://www.credly.com/badges/54f1454a-0646-404f-b0fe-9c56959e6338/public_url)

### Additional Certifications & Coursework (7 Credentials)
5. **ServiceNow CIS — Data Foundations (CMDB & CSDM)** — ServiceNow
6. **AWS Certified Cloud Practitioner** — Amazon Web Services (AWS)
7. **DSA Using Java** — Infosys Springboard
8. **Introduction to AI** — Infosys Springboard
9. **Power BI Workshop** — OfficeMaster
10. **Python Programming** — EZ Training and Technology
11. **Tata GenAI Powered Data Analytics Job Simulation** — Tata

---

## ✏️ Remaining Placeholders Checklist

| Category | File Location | Action Required | Status |
| :--- | :--- | :--- | :--- |
| **Profile Photograph** | `assets/images/jadesha-profile.jpg` | Integrated actual photo into Hero & About | **COMPLETED** |
| **Resume PDF** | `assets/Jadesha_Gowda_Resume.pdf` | Integrated actual uploaded resume with Download & View buttons | **COMPLETED** |
| **Credly Certifications** | Section 7 in `index.html` | Added all 4 Credly links and credential IDs | **COMPLETED** |
| **STSS Live Screenshots** | Section 5 in `index.html` | Added live system screenshots and modal gallery | **COMPLETED** |
| **GitHub Repository Links** | `index.html` (Modals) | Replace `[PLACEHOLDER]` with public GitHub repository URLs | Pending |
| **Live Project Demos** | `index.html` (Modals) | Add deployed demo links when available | Pending |
| **Career Chart Data** | `script.js` (`careerChartData`) | Change `isVerifiedDataProvided: true` when official skill ratings are provided | Pending |
| **Internship Organization & Dates** | `index.html` (Section 6) | Replace placeholder text if you wish to display company names & dates | Optional |
| **SEO Canonical URL** | `index.html` (`<head>`) | Replace `https://example.com/ [PLACEHOLDER]` with your live Netlify domain | Post-deployment |

---

## 🛡️ License
Designed and developed by **S Jadesha Gowda**. Built for professional recruitment and engineering portfolio presentation.
