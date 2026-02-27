# Pratik Anil Pawar — Cybersecurity Portfolio

**Information Security & Cybersecurity Fresher | SOC Analyst | Blue Teamer**

🔗 **Live Site:** [pratik-a-pawar.github.io/Portfolio](https://pratik-a-pawar.github.io/Portfolio/)

---

## Who I Am

Cybersecurity fresher with a B.Sc. in Electronics (CGPA 9.47/10) from Solapur University. I hold **CompTIA Security+ (SY0-701)**, **Google Cybersecurity**, and **Cisco SOC** certifications, with hands-on training through LetsDefend and TryHackMe.

I built an **n8n-based Phishing Email Analyzer** that automates IOC enrichment, threat classification, and MITRE ATT&CK mapping — cutting manual triage effort by ~50%.

Currently pursuing **TryHackMe SAL1** and **PT1** certifications while seeking an InfoSec Engineer / SOC Analyst L1 role in Mumbai, Maharashtra.

---

## What This Portfolio Demonstrates

This is a production-ready, security-hardened single-page website built from scratch — no frameworks, no templates, no build tools. Every line was written to showcase the kind of defensive thinking I bring to security work.

### Security Hardening

- Content Security Policy (CSP) with strict directives
- Frame busting and clickjacking prevention (`X-Frame-Options: DENY`)
- PII obfuscation with Base64 encoding and auto-masking contact reveals (10-second timer)
- Anti-scraping honeypots and bot detection
- SRI integrity hashes on all CDN resources
- View-only resume display (no download, no print, no save)
- `robots.txt` blocking known scraper bots (AhrefsBot, SemrushBot, GPTBot, CCBot)

### Interactive Features

- Terminal-style "About Me" with typing animation (`pratik@soc:~$`)
- Interactive radar chart for skills visualisation (canvas-rendered)
- MITRE ATT&CK heatmap with hover tooltips showing hands-on exposure per tactic
- Simulated alert triage walkthrough — from alert to verdict with MITRE mapping
- Dark/light theme toggle with `localStorage` persistence
- Scroll-reveal animations via `IntersectionObserver`
- Scroll progress indicator with particle canvas effects

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, accessible, SEO-optimised) |
| Styling | CSS3 + Bootstrap 5.3.2 (CDN with SRI) |
| Logic | Vanilla JavaScript — zero dependencies |
| Icons | Bootstrap Icons 1.11.1 (CDN with SRI) |
| Fonts | Inter (body) + JetBrains Mono (terminal/code) via Google Fonts |
| Resume | PDF.js 3.11.174 (CDN) for secure in-browser rendering |
| Hosting | GitHub Pages |
| Analytics | Umami (privacy-first, cookie-free, optional) |

---

## Portfolio Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated intro with SOC dashboard log ambiance and typed subtitle |
| **Why Me?** | Quick-hit hiring pitch with core tools grid |
| **About** | Terminal emulator with typed bio (`cat about.txt`) |
| **Skills** | Radar chart + categorised skill cards (SOC, Tools, Scripting, Cloud) |
| **MITRE ATT&CK** | Heatmap of 14 tactics with hands-on exposure indicators |
| **Certifications** | Completed and in-progress certs with status badges |
| **Projects** | Featured: n8n Phishing Analyzer. Upcoming: SOC Home Lab, Sigma Detection Pack, Wazuh Alert Automation |
| **Casefiles** | Investigation walkthroughs — coming soon |
| **Alert Triage Demo** | Step-by-step simulated phishing incident: alert → triage → IOC enrichment → verdict |
| **Experience** | Training timeline: LetsDefend, TryHackMe, n8n development |
| **Education** | Academic record |
| **Achievement** | National Mathematics Day Quiz — 1st Rank, Solapur University (2023) |
| **Blog** | Security writeups — coming soon |
| **Contact** | Privacy-first masked contact cards with temporary reveal |

---

## Architecture

All section content is rendered from JavaScript data arrays in `js/main.js`. To add or update content, edit the arrays — no HTML changes required.

```
Portfolio/
├── index.html                # Single-page app shell (semantic HTML5)
├── css/
│   └── style.css             # All custom styles — dark/light themes, animations
├── js/
│   ├── main.js               # Data arrays + rendering engine
│   ├── resume-data.js        # Base64-encoded resume PDF
│   ├── security.js           # Client-side security hardening module
│   └── analytics.js          # Umami analytics (opt-in, privacy-first)
├── Logos/                    # Social & platform icons (LinkedIn, GitHub, Contact)
├── Resume/                   # Resume source files (.pdf, .docx)
├── Profile Photo.png         # Professional headshot
├── _headers                  # Security headers for GitHub Pages
├── robots.txt                # Bot access control
├── .nojekyll                 # Bypass Jekyll processing
└── README.md
```

---

## Expanding Content

| What to add | Where to edit |
|-------------|---------------|
| New projects | `PROJECTS` array in `js/main.js` |
| Certifications | `CERTIFICATIONS` array in `js/main.js` |
| Blog posts / writeups | `BLOG_POSTS` array in `js/main.js` |
| Investigation casefiles | Replace `comingSoon: true` in `CASEFILES` array |
| Skills | `SKILL_CATEGORIES` and `RADAR_DATA` in `js/main.js` |
| Contact info | `CONTACT_INFO` array in `js/main.js` (Base64-encoded for privacy) |

---

<details>
<summary><strong>🛠 Setup & Deployment Guide</strong> (click to expand)</summary>

### Prerequisites

- A GitHub account
- Git installed locally
- Any text editor (VS Code recommended)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Pratik-a-Pawar/Portfolio.git
cd Portfolio
```

### Step 2 — Add Your Resume

1. Open `js/resume-data.js`
2. Encode your resume PDF to Base64 at [base64.guru/converter/encode/pdf](https://base64.guru/converter/encode/pdf)
3. Replace the placeholder string with your Base64 output
4. Save the file

### Step 3 — Commit and Push

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

### Step 4 — Enable GitHub Pages

1. Go to **Settings → Pages** in your repository
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save** and wait 2–3 minutes

### Step 5 — (Optional) Set Up Analytics

1. Create a free account at [cloud.umami.is](https://cloud.umami.is)
2. Add your website URL
3. Copy the Website ID
4. Open `js/analytics.js`, set `enabled: true`, and paste the ID
5. Commit and push

### Troubleshooting

- **404 error:** Verify GitHub Pages is enabled and `index.html` is in the repo root.
- **CSS/JS not loading:** File paths are case-sensitive on GitHub — check directory names.
- **Photo not showing:** Filename must match exactly: `Profile Photo.png`.
- **Resume not displaying:** Ensure the Base64 string is complete and does not include the `data:application/pdf;base64,` prefix.

</details>

---

## Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-pratik--a--pawar-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pratik-a-pawar/)
[![GitHub](https://img.shields.io/badge/GitHub-Pratik--a--Pawar-181717?style=flat&logo=github&logoColor=white)](https://github.com/Pratik-a-Pawar)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live_Site-3b82f6?style=flat&logo=googlechrome&logoColor=white)](https://pratik-a-pawar.github.io/Portfolio/)

---

## License

All rights reserved. This portfolio and its contents are the intellectual property of **Pratik Anil Pawar**.
