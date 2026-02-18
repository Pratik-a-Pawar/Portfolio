# Pratik Anil Pawar — Cybersecurity Portfolio

A production-ready, security-hardened single-page portfolio website built with pure HTML5, CSS3, and vanilla JavaScript. Designed for GitHub Pages hosting.

## Tech Stack

- **HTML5 + CSS3 + Vanilla JavaScript** — no build tools, no frameworks
- **Bootstrap 5.3.2** (CDN with SRI integrity hashes) — layout and responsive grid
- **Bootstrap Icons 1.11.1** (CDN with SRI) — iconography
- **Google Fonts** — Inter (body) + JetBrains Mono (terminal/code)

## Features

- Dark/light theme toggle with localStorage persistence
- Terminal-style "About Me" with typing animation
- Interactive radar chart for skills visualization
- MITRE ATT&CK heatmap with hover tooltips
- Simulated alert triage walkthrough demo
- Privacy-first contact cards with temporary reveal (10-second auto-mask)
- View-only resume display (no download)
- Scroll-reveal animations via IntersectionObserver
- Client-side security hardening (frame busting, PII obfuscation, anti-scraping)
- Content Security Policy (CSP) meta tag
- All sections rendered from JavaScript data arrays for easy expansion

## Setup — GitHub Pages Deployment

### Prerequisites

- A GitHub account
- Git installed on your computer
- (Optional) VS Code or any text editor

### Step 1: Create Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio`
3. Set visibility to **Public**
4. Do NOT initialize with a README (we already have one)
5. Click **Create repository**

### Step 2: Clone the Repository

```bash
git clone https://github.com/Pratik-a-Pawar/portfolio.git
```

### Step 3: Copy Portfolio Files

Copy **all** portfolio files into the cloned directory:

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── resume-data.js
│   ├── security.js
│   └── analytics.js
├── assets/
├── Profile Photo.png
├── .nojekyll
├── _headers
├── robots.txt
└── README.md
```

### Step 4: Add Your Resume

1. Open `js/resume-data.js` in a text editor
2. Go to [base64.guru/converter/encode/pdf](https://base64.guru/converter/encode/pdf)
3. Upload your resume PDF and copy the Base64 output
4. Replace `PASTE_YOUR_BASE64_ENCODED_PDF_HERE` with the Base64 string
5. Save the file

### Step 5: Commit and Push

```bash
cd portfolio
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and folder **/ (root)**
6. Click **Save**

### Step 7: Visit Your Portfolio

Wait 2-3 minutes for GitHub Pages to build, then visit:

```
https://pratik-a-pawar.github.io/portfolio
```

### Step 8: (Optional) Set Up Analytics

1. Create a free account at [cloud.umami.is](https://cloud.umami.is)
2. Add your website URL: `https://pratik-a-pawar.github.io/portfolio`
3. Copy the **Website ID** from your Umami dashboard
4. Open `js/analytics.js`
5. Set `enabled: true`
6. Replace `YOUR_UMAMI_WEBSITE_ID` with your Website ID
7. Commit and push the changes

## Troubleshooting

### Site shows 404

- Verify GitHub Pages is enabled in Settings > Pages
- Ensure the branch is set to `main` and folder is `/ (root)`
- Check that `index.html` is in the repository root (not in a subfolder)
- Wait a few minutes — GitHub Pages can take time to deploy

### CSS/JS not loading

- Check that file paths are correct (case-sensitive on GitHub)
- Verify the `css/` and `js/` directories exist
- Clear your browser cache (Ctrl+Shift+R)

### Profile photo not showing

- Ensure `Profile Photo.png` is in the repository root
- The filename is case-sensitive — it must match exactly

### Resume not displaying

- Verify the Base64 string in `resume-data.js` is complete and valid
- The string should not include the `data:application/pdf;base64,` prefix
- Try re-encoding your PDF if the output looks corrupted

## Expanding the Portfolio

All section content is driven by JavaScript data arrays in `js/main.js`. To add new content:

- **Projects:** Add objects to the `PROJECTS` array
- **Certifications:** Add objects to the `CERTIFICATIONS` array
- **Blog posts:** Add objects to the `BLOG_POSTS` array
- **Casefiles:** Replace `comingSoon: true` with actual content in `CASEFILES` array
- **Skills:** Edit `SKILL_CATEGORIES` and `RADAR_DATA` arrays

No HTML changes needed — the JS rendering functions handle everything.

## License

All rights reserved. This portfolio and its contents are the intellectual property of Pratik Anil Pawar.
