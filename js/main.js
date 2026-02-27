/**
 * main.js — Portfolio Engine for Pratik Anil Pawar
 * Renders all data-driven sections, handles interactions, and manages UI state.
 * No external dependencies except Bootstrap 5.3.2 (loaded via CDN).
 */

/* ============================================
   DATA ARRAYS — Edit these to update content
   ============================================ */

/** Core tools shown in the "Hire Me" section */
const CORE_TOOLS = [
    { name: 'SIEM',          icon: 'bi-shield-shaded' },
    { name: 'Python',        icon: 'bi-filetype-py' },
    { name: 'Kali Linux',    icon: 'bi-terminal' },
    { name: 'n8n',           icon: 'bi-gear-wide-connected' },
    { name: 'MITRE ATT&CK',  icon: 'bi-diagram-3' },
    { name: 'Wireshark',     icon: 'bi-wifi' }
];

/** Skill categories for cards and radar chart */
const SKILL_CATEGORIES = [
    {
        title: 'SOC & Blue Team',
        icon: 'bi-shield-lock',
        skills: ['SOC Operations', 'SIEM', 'Incident Response', 'Digital Forensics', 'Cyber Forensics', 'Threat Intelligence', 'Log Analysis', 'Alert Triage']
    },
    {
        title: 'Tools & Platforms',
        icon: 'bi-tools',
        skills: ['Kali Linux', 'Wireshark', 'Nmap', 'Splunk', 'Wazuh', 'LetsDefend', 'TryHackMe']
    },
    {
        title: 'Scripting & Programming',
        icon: 'bi-code-slash',
        skills: ['Python', 'Bash', 'PowerShell']
    },
    {
        title: 'Cloud & Frameworks',
        icon: 'bi-cloud',
        skills: ['AWS', 'Azure', 'Cloud Security', 'MITRE ATT&CK', 'Zero Trust', 'n8n']
    }
];

/** Radar chart data — values 0-100 representing proficiency */
const RADAR_DATA = {
    labels: ['SOC & SIEM', 'Scripting', 'Cloud Security', 'Digital Forensics', 'Automation'],
    values: [75, 55, 40, 50, 65]
};

/** MITRE ATT&CK tactics with exposure data */
const MITRE_TACTICS = [
    { id: 'TA0001', name: 'Reconnaissance',      active: false, tip: '' },
    { id: 'TA0042', name: 'Resource Development', active: false, tip: '' },
    { id: 'TA0001', name: 'Initial Access',       active: true,  tip: 'Phishing analysis project — n8n analyzer' },
    { id: 'TA0002', name: 'Execution',            active: true,  tip: 'Malware analysis basics from Security+ & SOC certs' },
    { id: 'TA0003', name: 'Persistence',          active: true,  tip: 'SOC certification lab scenarios' },
    { id: 'TA0004', name: 'Privilege Escalation',  active: false, tip: '' },
    { id: 'TA0005', name: 'Defense Evasion',       active: true,  tip: 'SOC certification lab scenarios' },
    { id: 'TA0006', name: 'Credential Access',     active: true,  tip: 'CompTIA Security+ knowledge domain' },
    { id: 'TA0007', name: 'Discovery',            active: true,  tip: 'Nmap, network scanning, enumeration' },
    { id: 'TA0008', name: 'Lateral Movement',      active: false, tip: '' },
    { id: 'TA0009', name: 'Collection',           active: true,  tip: 'Digital forensics knowledge from certs' },
    { id: 'TA0011', name: 'Command and Control',   active: true,  tip: 'Phishing analyzer IOC enrichment & C2 detection' },
    { id: 'TA0010', name: 'Exfiltration',          active: false, tip: '' },
    { id: 'TA0040', name: 'Impact',               active: false, tip: '' }
];

/** Certifications */
const CERTIFICATIONS = [
    {
        title: 'CompTIA Security+ SY0-701',
        issuer: 'CompTIA',
        status: 'completed',
        icon: 'bi-shield-fill-check',
        url: 'https://www.credly.com/badges/0fc779c9-35c7-41c7-ad68-607ea2942eed'
    },
    {
        title: 'Google Cybersecurity',
        issuer: 'Coursera (Google)',
        status: 'completed',
        icon: 'bi-google',
        url: 'https://www.coursera.org/account/accomplishments/professional-cert/4MSZX0BVHT8Q'
    },
    {
        title: 'Cisco SOC (Security Operations Center)',
        issuer: 'Coursera (Cisco)',
        status: 'completed',
        icon: 'bi-hdd-network',
        url: 'https://www.coursera.org/account/accomplishments/verify/UU7OYGVD8RLN'
    },
    {
        title: 'TryHackMe SAL1 (Security Analyst Level 1)',
        issuer: 'TryHackMe',
        status: 'in_progress',
        icon: 'bi-flag',
        url: null
    },
    {
        title: 'TryHackMe PT1 (Junior Penetration Tester)',
        issuer: 'TryHackMe',
        status: 'in_progress',
        icon: 'bi-bug',
        url: null
    }
];

/** Projects — add new projects by adding objects to this array */
const PROJECTS = [
    {
        title: 'n8n Phishing Email Analyzer',
        subtitle: 'Automated Phishing Analysis Pipeline',
        description: 'An end-to-end phishing analysis automation pipeline built on n8n that ingests suspicious emails, extracts IOCs (URLs, domains, file hashes), enriches them against threat intelligence feeds and reputation services, and classifies the threat level automatically. The pipeline generates structured reports with MITRE ATT&CK mapping, significantly reducing the manual effort required for phishing triage in SOC environments.',
        techStack: ['n8n', 'API Integrations', 'Email Parsing', 'IOC Enrichment', 'Threat Classification'],
        mitreMapping: 'T1566 (Phishing)',
        featured: true,
        githubUrl: null,
        comingSoon: false
    },
    {
        title: 'SOC Home Lab',
        subtitle: 'Security Operations Center Environment',
        description: 'Building a virtual SOC environment with SIEM, EDR, and log aggregation.',
        techStack: ['Wazuh', 'Splunk', 'ELK Stack', 'VirtualBox'],
        mitreMapping: null,
        featured: false,
        githubUrl: null,
        comingSoon: true
    },
    {
        title: 'Sigma Detection Pack',
        subtitle: 'Custom Detection Rules',
        description: 'A collection of Sigma rules for common threat scenarios with tuning notes.',
        techStack: ['Sigma', 'YAML', 'Splunk SPL', 'Wazuh Rules'],
        mitreMapping: null,
        featured: false,
        githubUrl: null,
        comingSoon: true
    },
    {
        title: 'Wazuh Alert Automation',
        subtitle: 'Automated Response Workflows',
        description: 'Automated alert response and enrichment workflows for Wazuh SIEM.',
        techStack: ['Wazuh', 'Python', 'n8n', 'REST APIs'],
        mitreMapping: null,
        featured: false,
        githubUrl: null,
        comingSoon: true
    }
];

/** Investigation casefiles (coming soon placeholders) */
const CASEFILES = [
    {
        title: 'Phishing Email Triage',
        steps: ['Alert', 'Investigation', 'Findings', 'Containment', 'Lessons', 'MITRE Mapping'],
        comingSoon: true
    },
    {
        title: 'Suspicious Login Investigation',
        steps: ['Alert', 'Investigation', 'Findings', 'Containment', 'Lessons', 'MITRE Mapping'],
        comingSoon: true
    },
    {
        title: 'Malware Alert Analysis',
        steps: ['Alert', 'Investigation', 'Findings', 'Containment', 'Lessons', 'MITRE Mapping'],
        comingSoon: true
    }
];

/** Alert triage demo steps */
const TRIAGE_STEPS = [
    {
        number: 1,
        title: 'Alert Received',
        content: 'Suspicious email flagged — potential phishing with malicious attachment. Priority: High. Source: Email gateway.',
        isVerdict: false
    },
    {
        number: 2,
        title: 'Initial Triage',
        content: 'Check sender reputation, examine email headers for spoofing indicators, extract URLs and file attachments for analysis.',
        isVerdict: false
    },
    {
        number: 3,
        title: 'IOC Enrichment',
        content: 'Submit file hash to VirusTotal — 12/70 detections. URL defanged and checked against threat intel feeds. Domain registered 48 hours ago — high risk indicator.',
        isVerdict: false
    },
    {
        number: 4,
        title: 'Verdict & Response',
        content: 'Confirmed phishing — T1566.001 (Spearphishing Attachment). Escalated to Tier 2. Sender domain blocklisted. Affected mailbox quarantined. IOCs added to blocklist.',
        isVerdict: true
    }
];

/** Experience / Training Timeline */
const EXPERIENCE = [
    {
        title: 'LetsDefend SOC Analyst Training',
        period: '2025 – Present',
        description: 'Completed real-world SOC alert triage scenarios including phishing analysis, malware alerts, and suspicious network activity investigations. Practiced incident escalation and documentation procedures.',
        icon: 'bi-shield-fill'
    },
    {
        title: 'TryHackMe Hands-On Labs',
        period: '2025 – Present',
        description: 'Active on TryHackMe completing rooms in network security, web application security, and incident response. Currently on the SAL1 (Security Analyst Level 1) and PT1 (Junior Penetration Tester) learning paths.',
        icon: 'bi-terminal-fill'
    },
    {
        title: 'n8n Security Automation Development',
        period: '2025 – Present',
        description: 'Built and deployed a phishing email analysis automation pipeline using n8n, integrating multiple threat intelligence APIs. Reduced manual triage effort by approximately 50%.',
        icon: 'bi-gear-wide-connected'
    }
];

/** Education */
const EDUCATION = [
    {
        degree: 'Bachelor of Science in Electronics',
        institution: 'Solapur University',
        score: 'CGPA: 9.47/10',
        period: '2022 – 2025',
        icon: 'bi-mortarboard-fill'
    },
    {
        degree: 'Senior Secondary (Class 12)',
        institution: 'Maharashtra State Board',
        score: '67.23%',
        period: '2018 – 2020',
        icon: 'bi-book'
    },
    {
        degree: 'Secondary (Class 10)',
        institution: 'Maharashtra State Board',
        score: '90.20%',
        period: '2016 – 2018',
        icon: 'bi-journal-bookmark'
    }
];

/** Blog entries — add new posts by adding objects to this array */
const BLOG_POSTS = [
    // Example structure for future posts:
    // {
    //     title: 'My First Security Writeup',
    //     date: '2025-01-15',
    //     summary: 'An analysis of a real-world phishing campaign...',
    //     tags: ['Phishing', 'SOC', 'MITRE ATT&CK'],
    //     link: '#'
    // }
];

/** Contact information — privacy-first: no emails or URLs displayed */
const CONTACT_INFO = [
    {
        label: 'Email',
        icon: 'bi-envelope-fill',
        isClickable: false,
        isEmailReveal: true,
        emailB64: 'cGF3YXIucHJhdGlrQGhvdG1haWwuY29t'
    },
    {
        label: 'LinkedIn',
        icon: 'bi-linkedin',
        displayValue: '',
        clickUrl: 'https://www.linkedin.com/in/pratik-a-pawar/',
        isClickable: true,
        openInNewTab: true
    },
    {
        label: 'GitHub',
        icon: 'bi-github',
        displayValue: '',
        clickUrl: 'https://github.com/Pratik-a-Pawar',
        isClickable: true,
        openInNewTab: true
    },
    {
        label: 'Location',
        icon: 'bi-geo-alt-fill',
        displayValue: 'Pune, Maharashtra, India',
        isClickable: false
    }
];


/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    var initFns = [
        initTheme,
        renderCoreTools,
        renderSkillCards,
        renderRadarChart,
        renderMitreHeatmap,
        renderCertifications,
        renderProjects,
        renderCasefiles,
        renderTriageSteps,
        renderExperience,
        renderEducation,
        renderAchievement,
        renderBlog,
        renderContact,
        initNavbarScroll,
        initActiveNavLink,
        initSmoothScroll,
        initBackToTop,
        initScrollReveal,
        initSectionScanEffect,
        initScrollProgress,
        initScrollParticles,
        initHeroTyping,
        initTerminalAnimation,
        initTriageDemo,
        initResumeViewer,
        initConsoleEasterEgg,
        initCursorParticles,
        initCursorGlow,
        initSocialIconEffects,
        initMagneticTilt
    ];
    for (var i = 0; i < initFns.length; i++) {
        try { initFns[i](); } catch (e) { console.error(initFns[i].name + ' failed:', e); }
    }
});


/* ============================================
   THEME MANAGEMENT
   ============================================ */

/**
 * Initialize theme from localStorage or system preference.
 */
function initTheme() {
    var toggle = document.getElementById('themeToggle');
    var stored = localStorage.getItem('portfolio-theme');

    if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (!toggle) return;

    toggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'light' ? 'dark' : 'light';

        // Animate: glow pulse on button + spin-morph the shapes
        toggle.classList.add('theme-spinning');

        // Swap theme at the midpoint when shapes are invisible
        setTimeout(function () {
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
        }, 250);

        // Remove animation class after completion
        setTimeout(function () {
            toggle.classList.remove('theme-spinning');
        }, 600);
    });
}


/* ============================================
   RENDERING FUNCTIONS
   ============================================ */

/** Render core tool badges in "Hire Me" section */
function renderCoreTools() {
    var container = document.getElementById('coreToolsGrid');
    if (!container) return;
    var html = '';
    for (var i = 0; i < CORE_TOOLS.length; i++) {
        var tool = CORE_TOOLS[i];
        html += '<div class="tool-badge"><i class="bi ' + tool.icon + '"></i>' + escapeHtml(tool.name) + '</div>';
    }
    container.innerHTML = html;
}

/** Render skill category cards */
function renderSkillCards() {
    var container = document.getElementById('skillCardsContainer');
    if (!container) return;
    var html = '';
    for (var i = 0; i < SKILL_CATEGORIES.length; i++) {
        var cat = SKILL_CATEGORIES[i];
        html += '<div class="col-md-6 mb-3 scroll-reveal">';
        html += '<div class="skill-card">';
        html += '<div class="skill-card-title"><i class="bi ' + cat.icon + '"></i>' + escapeHtml(cat.title) + '</div>';
        html += '<div class="skill-tags">';
        for (var j = 0; j < cat.skills.length; j++) {
            html += '<span class="skill-tag">' + escapeHtml(cat.skills[j]) + '</span>';
        }
        html += '</div></div></div>';
    }
    container.innerHTML = html;
}

/** Render MITRE ATT&CK heatmap */
function renderMitreHeatmap() {
    var container = document.getElementById('mitreHeatmap');
    if (!container) return;
    var html = '';
    for (var i = 0; i < MITRE_TACTICS.length; i++) {
        var tactic = MITRE_TACTICS[i];
        var activeClass = tactic.active ? ' active' : '';
        html += '<div class="mitre-cell' + activeClass + '">';
        html += escapeHtml(tactic.name);
        if (tactic.active && tactic.tip) {
            html += '<div class="mitre-tooltip">' + escapeHtml(tactic.tip) + '</div>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

/** Render certification cards */
function renderCertifications() {
    var container = document.getElementById('certificationsContainer');
    if (!container) return;
    var html = '';
    for (var i = 0; i < CERTIFICATIONS.length; i++) {
        var cert = CERTIFICATIONS[i];
        var badgeClass = cert.status === 'completed' ? 'cert-badge-completed' : 'cert-badge-progress';
        var badgeText = cert.status === 'completed' ? '<i class="bi bi-check-circle-fill"></i> Completed' : '<i class="bi bi-arrow-repeat"></i> In Progress';
        html += '<div class="col-lg-4 col-md-6 mb-4 scroll-reveal">';
        if (cert.url) {
            html += '<a href="' + escapeHtml(cert.url) + '" target="_blank" rel="noopener noreferrer" class="cert-card-link" style="text-decoration:none;color:inherit;display:block;height:100%;">';
        }
        html += '<div class="cert-card">';
        html += '<div class="cert-icon"><i class="bi ' + cert.icon + '"></i></div>';
        html += '<div class="cert-card-title">' + escapeHtml(cert.title) + '</div>';
        html += '<div class="cert-issuer">' + escapeHtml(cert.issuer) + '</div>';
        html += '<div class="cert-badge ' + badgeClass + '">' + badgeText + '</div>';
        if (cert.url) {
            html += '<div class="cert-verify-hint"><i class="bi bi-box-arrow-up-right me-1"></i>Verify</div>';
        }
        html += '</div>';
        if (cert.url) {
            html += '</a>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

/** Render project cards */
function renderProjects() {
    var container = document.getElementById('projectsContainer');
    if (!container) return;
    var html = '';

    for (var i = 0; i < PROJECTS.length; i++) {
        var proj = PROJECTS[i];

        if (proj.featured && !proj.comingSoon) {
            // Showcase card for the featured project
            html += '<div class="project-showcase scroll-reveal">';
            html += '<div class="row">';
            html += '<div class="col-lg-7">';
            html += '<div class="project-showcase-title"><i class="bi bi-gear-wide-connected"></i>' + escapeHtml(proj.title) + '</div>';
            html += '<div class="project-showcase-subtitle">' + escapeHtml(proj.subtitle) + '</div>';
            html += '<p class="project-description">' + escapeHtml(proj.description) + '</p>';
            html += '<div class="project-tech-tags">';
            for (var t = 0; t < proj.techStack.length; t++) {
                html += '<span class="tech-tag">' + escapeHtml(proj.techStack[t]) + '</span>';
            }
            if (proj.mitreMapping) {
                html += '<span class="tech-tag mitre-tag"><i class="bi bi-diagram-3 me-1"></i>' + escapeHtml(proj.mitreMapping) + '</span>';
            }
            html += '</div>';
            if (proj.githubUrl) {
                html += '<a href="' + escapeHtml(proj.githubUrl) + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm"><i class="bi bi-github me-1"></i>View on GitHub</a>';
            } else {
                html += '<span class="text-muted small"><i class="bi bi-lock me-1"></i>Private Repository</span>';
            }
            html += '</div>';
            html += '<div class="col-lg-5">';
            // Before/After metric visual
            html += '<div class="metric-visual">';
            html += '<div class="metric-visual-title">Triage Time Comparison</div>';
            html += '<div class="metric-bars">';
            html += '<div class="metric-bar-row"><span class="metric-label">Manual Triage</span>';
            html += '<div class="metric-bar-track"><div class="metric-bar-fill bar-before" data-width="100">~30 min</div></div></div>';
            html += '<div class="metric-bar-row"><span class="metric-label">Automated</span>';
            html += '<div class="metric-bar-track"><div class="metric-bar-fill bar-after" data-width="50">~15 min</div></div></div>';
            html += '</div>';
            html += '<div class="metric-reduction">~50% Reduction</div>';
            html += '</div>';
            // Architecture diagram placeholder
            html += '<div class="arch-placeholder">';
            html += '<i class="bi bi-diagram-2"></i>';
            html += '<div>Architecture Diagram — Coming Soon</div>';
            html += '</div>';
            html += '</div>';
            html += '</div></div>';
        } else if (proj.comingSoon) {
            // Coming soon placeholder card
            if (i === 1) {
                html += '<div class="row mt-3">';
            }
            html += '<div class="col-lg-4 col-md-6 mb-4 scroll-reveal">';
            html += '<div class="project-card-coming-soon">';
            html += '<div class="project-card-title">' + escapeHtml(proj.title) + '</div>';
            html += '<div class="project-card-desc">' + escapeHtml(proj.subtitle) + '</div>';
            html += '<div class="coming-soon-overlay">';
            html += '<i class="bi bi-lock-fill"></i>';
            html += '<span>Coming Soon</span>';
            html += '</div>';
            html += '</div></div>';
            if (i === PROJECTS.length - 1) {
                html += '</div>';
            }
        }
    }
    container.innerHTML = html;

    // Animate metric bars on scroll
    initMetricBars();
}

/** Render casefile cards */
function renderCasefiles() {
    var container = document.getElementById('casefilesContainer');
    if (!container) return;
    var html = '';
    for (var i = 0; i < CASEFILES.length; i++) {
        var cf = CASEFILES[i];
        html += '<div class="col-lg-4 col-md-6 mb-4 scroll-reveal">';
        html += '<div class="casefile-card">';
        html += '<div class="casefile-card-title"><i class="bi bi-file-earmark-lock"></i>' + escapeHtml(cf.title) + '</div>';
        html += '<ul class="casefile-steps">';
        for (var s = 0; s < cf.steps.length; s++) {
            html += '<li><i class="bi bi-chevron-right"></i>' + escapeHtml(cf.steps[s]) + '</li>';
        }
        html += '</ul>';
        if (cf.comingSoon) {
            html += '<div class="casefile-coming-soon">';
            html += '<i class="bi bi-lock-fill"></i>';
            html += '<span>Coming Soon</span>';
            html += '</div>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

/** Render triage demo steps */
function renderTriageSteps() {
    var container = document.getElementById('triageSteps');
    if (!container) return;
    var html = '';
    for (var i = 0; i < TRIAGE_STEPS.length; i++) {
        var step = TRIAGE_STEPS[i];
        var verdictClass = step.isVerdict ? ' verdict' : '';
        html += '<div class="triage-step' + verdictClass + '" id="triageStep' + step.number + '">';
        html += '<div class="triage-step-header">';
        html += '<span class="triage-step-number">' + step.number + '</span>';
        html += '<span class="triage-step-title">' + escapeHtml(step.title) + '</span>';
        html += '</div>';
        html += '<div class="triage-step-content">' + escapeHtml(step.content);
        if (step.isVerdict) {
            html += ' <span class="tech-tag mitre-tag ms-1"><i class="bi bi-diagram-3 me-1"></i>T1566.001</span>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

/** Render experience timeline */
function renderExperience() {
    var container = document.getElementById('experienceTimeline');
    if (!container) return;
    var html = '';
    for (var i = 0; i < EXPERIENCE.length; i++) {
        var exp = EXPERIENCE[i];
        html += '<div class="timeline-item scroll-reveal">';
        html += '<div class="timeline-dot"><i class="bi ' + exp.icon + '"></i></div>';
        html += '<div class="timeline-item-title">' + escapeHtml(exp.title) + '</div>';
        html += '<div class="timeline-item-period">' + escapeHtml(exp.period) + '</div>';
        html += '<div class="timeline-item-desc">' + escapeHtml(exp.description) + '</div>';
        html += '</div>';
    }
    container.innerHTML = html;
}

/** Render education cards */
function renderEducation() {
    var container = document.getElementById('educationContainer');
    if (!container) return;
    var html = '';
    for (var i = 0; i < EDUCATION.length; i++) {
        var edu = EDUCATION[i];
        html += '<div class="col-lg-4 col-md-6 mb-4 scroll-reveal">';
        html += '<div class="edu-card">';
        html += '<div class="edu-icon"><i class="bi ' + edu.icon + '"></i></div>';
        html += '<div class="edu-degree">' + escapeHtml(edu.degree) + '</div>';
        html += '<div class="edu-institution">' + escapeHtml(edu.institution) + '</div>';
        html += '<div class="edu-score">' + escapeHtml(edu.score) + '</div>';
        html += '<div class="edu-period">' + escapeHtml(edu.period) + '</div>';
        html += '</div></div>';
    }
    container.innerHTML = html;
}

/** Render achievement card */
function renderAchievement() {
    var container = document.getElementById('achievementContainer');
    if (!container) return;
    var html = '<div class="col-md-8 col-lg-6 scroll-reveal">';
    html += '<a href="https://drive.google.com/file/d/1DfjczXgJkYyesjVMd9BuBcvX9RLs-2md/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="achievement-card-link" style="text-decoration:none;color:inherit;display:block;">';
    html += '<div class="achievement-card">';
    html += '<div class="achievement-icon"><i class="bi bi-trophy-fill"></i></div>';
    html += '<div class="achievement-title">National Mathematics Day — Quiz Competition Winner</div>';
    html += '<div class="achievement-desc">Captured 1st Rank in Quiz Competition, National Mathematics Day 2023, awarded by Solapur University.</div>';
    html += '<div class="achievement-verify-hint"><i class="bi bi-box-arrow-up-right me-1"></i>View Certificate</div>';
    html += '</div>';
    html += '</a>';
    html += '</div>';
    container.innerHTML = html;
}

/** Render blog section */
function renderBlog() {
    var container = document.getElementById('blogContainer');
    if (!container) return;

    if (BLOG_POSTS.length === 0) {
        var html = '<div class="col-12 scroll-reveal">';
        html += '<div class="blog-placeholder-card">';
        html += '<i class="bi bi-journal-richtext"></i>';
        html += '<p>Coming Soon — Stay tuned for security research and incident analysis writeups.</p>';
        html += '</div></div>';
        container.innerHTML = html;
        return;
    }

    var html = '';
    for (var i = 0; i < BLOG_POSTS.length; i++) {
        var post = BLOG_POSTS[i];
        html += '<div class="col-lg-4 col-md-6 mb-4 scroll-reveal">';
        html += '<div class="blog-card">';
        html += '<div class="blog-card-title">' + escapeHtml(post.title) + '</div>';
        html += '<div class="blog-card-date">' + escapeHtml(post.date) + '</div>';
        html += '<div class="blog-card-summary">' + escapeHtml(post.summary) + '</div>';
        html += '<div class="blog-card-tags">';
        for (var t = 0; t < post.tags.length; t++) {
            html += '<span class="tech-tag">' + escapeHtml(post.tags[t]) + '</span>';
        }
        html += '</div>';
        if (post.link) {
            html += '<a href="' + escapeHtml(post.link) + '" class="btn btn-outline-primary btn-sm mt-2">Read More</a>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html;
}

/* Inline SVG eyes — no icon-font dependency, always render */
var EYE_CLOSED_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
var EYE_OPEN_SVG   = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.35"/><circle cx="12" cy="12" r="3"/></svg>';

/** Render contact cards */
function renderContact() {
    var container = document.getElementById('contactContainer');
    if (!container) return;
    var html = '';
    for (var i = 0; i < CONTACT_INFO.length; i++) {
        var info = CONTACT_INFO[i];
        html += '<div class="col-lg-3 col-md-6 mb-4 scroll-reveal">';

        if (info.isEmailReveal) {
            /* ── Email card: hover-to-show eye button, click to decrypt ── */
            html += '<div class="contact-card email-reveal-card" id="emailRevealCard">';

            /* Eye button — inline SVG, visible only on card hover */
            html += '<button class="eye-reveal-btn" id="eyeRevealBtn"' +
                    ' aria-label="Reveal email address" title="Click to reveal email">' +
                    EYE_CLOSED_SVG +
                    '</button>';

            html += '<div class="contact-card-icon"><i class="bi ' + info.icon + '"></i></div>';
            html += '<div class="contact-card-label">' + escapeHtml(info.label) + '</div>';
            html += '<div class="email-text-reveal" id="emailTextReveal"></div>';
            html += '<div class="email-countdown" id="emailCountdown">' +
                    '<div class="email-countdown-fill" id="emailCountdownFill"></div></div>';
            html += '</div>';

        } else if (info.isClickable) {
            html += '<a href="' + escapeHtml(info.clickUrl) + '"' +
                    (info.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '') +
                    ' class="contact-card contact-card-clickable" style="text-decoration:none;color:inherit;">';
            html += '<div class="contact-card-icon"><i class="bi ' + info.icon + '"></i></div>';
            html += '<div class="contact-card-label">' + escapeHtml(info.label) + '</div>';
            html += '</a>';

        } else {
            html += '<div class="contact-card">';
            html += '<div class="contact-card-icon"><i class="bi ' + info.icon + '"></i></div>';
            html += '<div class="contact-card-label">' + escapeHtml(info.label) + '</div>';
            if (info.displayValue) {
                html += '<div class="contact-card-value"><span>' + escapeHtml(info.displayValue) + '</span></div>';
            }
            html += '</div>';
        }

        html += '</div>';
    }
    container.innerHTML = html;

    /* Attach eye-button handler after DOM is rendered */
    var eyeBtn = document.getElementById('eyeRevealBtn');
    if (eyeBtn) {
        eyeBtn.addEventListener('click', handleEmailReveal);
    }
}


/* ============================================
   INTERACTIVE FEATURES
   ============================================ */

/** Navbar scroll effect */
function initNavbarScroll() {
    var navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    function onScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/** Active nav link highlighting */
function initActiveNavLink() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('#mainNavbar .nav-link[href^="#"]');

    function highlightNav() {
        var scrollPos = window.scrollY + 120;
        var currentId = '';

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if (section.offsetTop <= scrollPos) {
                currentId = section.getAttribute('id');
            }
        }

        for (var j = 0; j < navLinks.length; j++) {
            navLinks[j].classList.remove('active');
            if (navLinks[j].getAttribute('href') === '#' + currentId) {
                navLinks[j].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
}

/** Smooth scroll with mobile menu auto-close */
function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    var navCollapse = document.getElementById('navbarNav');

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu
                if (navCollapse && navCollapse.classList.contains('show')) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    }
}

/** Back to top button */
function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    // Inline SVG arrow — no icon-font dependency
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>';

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/** Enhanced Scroll-reveal — staggered with cyber scanner flash */
function initScrollReveal() {
    var elements = document.querySelectorAll('.scroll-reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('revealed');
        }
        return;
    }

    /* Assign stagger delays — group grid row items at the same delay
       so cards in the same Bootstrap row appear together */
    var sections = document.querySelectorAll('section');

    for (var s = 0; s < sections.length; s++) {
        var reveals = sections[s].querySelectorAll('.scroll-reveal');
        var cardIndex = 0;

        for (var r = 0; r < reveals.length; r++) {
            reveals[r].setAttribute('data-reveal-dir', 'up');

            if (reveals[r].classList.contains('section-heading') || reveals[r].classList.contains('section-subheading')) {
                reveals[r].setAttribute('data-reveal-delay', '0');
            } else {
                /* Group every 3 cards at the same delay (typical Bootstrap row = 3 cols) */
                var rowGroup = Math.floor(cardIndex / 3);
                reveals[r].setAttribute('data-reveal-delay', Math.min(rowGroup + 1, 6));
                cardIndex++;
            }
        }
    }

    /* Observe individual elements */
    var elementObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var el = entries[i].target;
                el.classList.add('revealed');

                /* Add scanner flash to cards */
                if (el.querySelector('.project-card, .cert-card, .casefile-card, .blog-card, .contact-card, .education-card')) {
                    el.classList.add('scanner-flash');
                }

                elementObserver.unobserve(el);
            }
        }
    }, {
        threshold: 0.08,
        rootMargin: '-30px'
    });

    for (var i = 0; i < elements.length; i++) {
        elementObserver.observe(elements[i]);
    }
}

/** Cyber section scan-line effect — a neon line sweeps across each section on first entry */
function initSectionScanEffect() {
    var sections = document.querySelectorAll('section.section-padding');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var sectionObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('scan-active');
                entries[i].target.classList.add('glow-active');
                sectionObserver.unobserve(entries[i].target);
            }
        }
    }, {
        threshold: 0.12,
        rootMargin: '-20px'
    });

    for (var i = 0; i < sections.length; i++) {
        sectionObserver.observe(sections[i]);
    }
}

/** Glowing scroll progress indicator at top of page */
function initScrollProgress() {
    var fill = document.getElementById('scrollProgressFill');
    var glow = document.getElementById('scrollProgressGlow');
    var track = fill ? fill.parentElement : null;
    if (!fill || !track) return;

    var ticking = false;
    var lastScrollY = 0;
    var isScrolling = false;
    var scrollTimer = null;

    function updateProgress() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        fill.style.width = progress + '%';

        /* Position glow at the leading edge */
        if (glow) {
            glow.style.left = 'calc(' + progress + '% - 40px)';
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }

        /* Show glow while actively scrolling */
        if (!isScrolling) {
            isScrolling = true;
            track.classList.add('active');
        }
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            isScrolling = false;
            track.classList.remove('active');
        }, 800);
    }, { passive: true });

    updateProgress();
}

/** Scroll-triggered particle burst system — glowing cyber particles emit from sections entering view */
function initScrollParticles() {
    var canvas = document.getElementById('scrollParticleCanvas');
    if (!canvas) return;

    /* Respect prefers-reduced-motion */
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animationId = null;
    var isRunning = false;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var colors = [
        'rgba(56, 189, 248, ',   /* cyan */
        'rgba(99, 102, 241, ',   /* indigo */
        'rgba(139, 92, 246, ',   /* violet */
        'rgba(245, 158, 11, '    /* amber */
    ];

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = -Math.random() * 2.5 - 0.5;
        this.life = 1;
        this.decay = 0.008 + Math.random() * 0.012;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.vy -= 0.01; /* slight upward drift */
        this.life -= this.decay;
        this.size *= 0.995;
    };

    Particle.prototype.draw = function () {
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (this.life * 0.6) + ')';
        ctx.fill();

        /* Glow */
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color + (this.life * 0.15) + ')';
        ctx.fill();
    };

    function spawnBurst(yPosition) {
        var count = 15 + Math.floor(Math.random() * 10);
        for (var i = 0; i < count; i++) {
            var x = Math.random() * canvas.width;
            /* Convert page Y to viewport Y */
            var viewY = yPosition - window.scrollY;
            if (viewY < 0 || viewY > canvas.height) viewY = canvas.height * 0.5;
            particles.push(new Particle(x, viewY));
        }
        if (!isRunning) {
            isRunning = true;
            animate();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            isRunning = false;
        }
    }

    /* Observe sections — emit particles when they enter view */
    var sections = document.querySelectorAll('section.section-padding');
    if (!('IntersectionObserver' in window) || !sections.length) return;

    var particleObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var rect = entries[i].target.getBoundingClientRect();
                spawnBurst(entries[i].target.offsetTop);
                particleObserver.unobserve(entries[i].target);
            }
        }
    }, {
        threshold: 0.15,
        rootMargin: '0px'
    });

    for (var i = 0; i < sections.length; i++) {
        particleObserver.observe(sections[i]);
    }
}

/** Hero subtitle typing effect */
function initHeroTyping() {
    var element = document.getElementById('heroTyped');
    if (!element) return;

    var titles = [
        'Information Security Engineer',
        'DFIR Enthusiast',
        'Blue Team Automation',
        'Threat Hunting \u2022 MITRE ATT&CK'
    ];
    var titleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 80;
    var deleteSpeed = 40;
    var pauseEnd = 2000;
    var pauseStart = 500;

    function type() {
        var current = titles[titleIndex];

        if (!isDeleting) {
            element.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, pauseEnd);
                return;
            }
            setTimeout(type, typeSpeed);
        } else {
            element.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(type, pauseStart);
                return;
            }
            setTimeout(type, deleteSpeed);
        }
    }

    setTimeout(type, 1000);
}

/** Terminal typing animation (runs once on scroll-into-view) */
function initTerminalAnimation() {
    var terminalWindow = document.getElementById('terminalWindow');
    if (!terminalWindow) return;

    var hasRun = false;

    var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !hasRun) {
            hasRun = true;
            observer.disconnect();
            runTerminalAnimation();
        }
    }, { threshold: 0.3 });

    observer.observe(terminalWindow);
}

function runTerminalAnimation() {
    var cmd1 = document.getElementById('terminalCmd1');
    var output = document.getElementById('terminalOutput');
    var cmd2 = document.getElementById('terminalCmd2');
    var status = document.getElementById('terminalStatus');
    var finalPrompt = document.getElementById('terminalFinalPrompt');
    var command1 = 'cat about.txt';
    var command2 = 'echo $STATUS';

    // Type first command
    typeText(cmd1, command1, 60, function () {
        // Show output
        setTimeout(function () {
            output.classList.remove('hidden');
            // Type second command
            setTimeout(function () {
                typeText(cmd2, command2, 60, function () {
                    setTimeout(function () {
                        status.classList.remove('hidden');
                        setTimeout(function () {
                            finalPrompt.classList.remove('hidden');
                        }, 300);
                    }, 300);
                });
            }, 600);
        }, 400);
    });
}

/**
 * Type text character-by-character into an element.
 * @param {HTMLElement} el - Target element
 * @param {string} text - Text to type
 * @param {number} speed - Milliseconds per character
 * @param {Function} callback - Called when typing completes
 */
function typeText(el, text, speed, callback) {
    var idx = 0;
    function tick() {
        if (idx < text.length) {
            el.textContent += text.charAt(idx);
            idx++;
            setTimeout(tick, speed);
        } else if (callback) {
            callback();
        }
    }
    tick();
}

/** Alert Triage Demo interaction */
function initTriageDemo() {
    var startBtn = document.getElementById('triageStartBtn');
    var resetBtn = document.getElementById('triageResetBtn');
    if (!startBtn || !resetBtn) return;

    var isRunning = false;

    startBtn.addEventListener('click', function () {
        if (isRunning) return;
        isRunning = true;
        startBtn.classList.add('hidden');
        resetBtn.classList.remove('hidden');

        // Show steps one by one with delays
        var steps = document.querySelectorAll('.triage-step');
        var delay = 0;
        for (var i = 0; i < steps.length; i++) {
            (function (step, d) {
                setTimeout(function () {
                    step.classList.add('visible');
                }, d);
            })(steps[i], delay);
            delay += 1200;
        }
    });

    resetBtn.addEventListener('click', function () {
        isRunning = false;
        var steps = document.querySelectorAll('.triage-step');
        for (var i = 0; i < steps.length; i++) {
            steps[i].classList.remove('visible');
        }
        resetBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
    });
}

/** Email reveal: eye open → decrypt → 9-second display → encrypt → eye close */
function handleEmailReveal() {
    var btn    = document.getElementById('eyeRevealBtn');
    var textEl = document.getElementById('emailTextReveal');
    var cdBar  = document.getElementById('emailCountdown');
    var cdFill = document.getElementById('emailCountdownFill');

    if (!btn || !textEl) return;
    if (btn._busy) return;
    btn._busy = true;

    clearTimeout(btn._revealTimeout);
    clearInterval(btn._decryptInterval);
    clearInterval(btn._countInterval);

    var email = atob(CONTACT_INFO[0].emailB64);
    var pool  = '!@#$%^&*?><[]{}|~ABCDEFGHIJKabcdefghijklm0123456789';

    /* PHASE 1 — Eye opening burst (550 ms) */
    btn.classList.add('eye-opening');

    setTimeout(function () {
        btn.classList.remove('eye-opening');
        btn.classList.add('eye-open');
        btn.innerHTML = EYE_OPEN_SVG;   // swap to open eye

        /* PHASE 2 — Decrypt: characters cycle then lock in */
        textEl.textContent = '';
        textEl.classList.remove('encrypting');
        textEl.classList.add('visible', 'decrypting');

        var iter  = 0;
        var total = email.length * 3;

        btn._decryptInterval = setInterval(function () {
            textEl.textContent = email.split('').map(function (ch, idx) {
                if (idx < Math.floor(iter / 3)) return ch;
                if (ch === '@' || ch === '.') return ch;
                return pool[Math.floor(Math.random() * pool.length)];
            }).join('');
            iter++;

            if (iter > total + 4) {
                clearInterval(btn._decryptInterval);
                textEl.textContent = email;
                textEl.classList.remove('decrypting');
                btn._busy = false;

                /* Block copy / cut / right-click / selection while email is visible */
                var blockAction = function (e) { e.preventDefault(); return false; };
                textEl.addEventListener('copy',        blockAction);
                textEl.addEventListener('cut',         blockAction);
                textEl.addEventListener('contextmenu', blockAction);
                textEl.addEventListener('selectstart', blockAction);
                textEl.addEventListener('dragstart',   blockAction);
                textEl._unblockActions = function () {
                    textEl.removeEventListener('copy',        blockAction);
                    textEl.removeEventListener('cut',         blockAction);
                    textEl.removeEventListener('contextmenu', blockAction);
                    textEl.removeEventListener('selectstart', blockAction);
                    textEl.removeEventListener('dragstart',   blockAction);
                };

                if (typeof trackEvent === 'function') trackEvent('email_reveal');

                /* PHASE 3 — Countdown bar, 9 seconds */
                if (cdBar)  cdBar.classList.add('active');
                if (cdFill) cdFill.style.width = '100%';

                var duration  = 9000;
                var startTime = Date.now();

                btn._countInterval = setInterval(function () {
                    var elapsed   = Date.now() - startTime;
                    var remaining = Math.max(0, 1 - elapsed / duration);
                    if (cdFill) cdFill.style.width = (remaining * 100) + '%';
                    if (elapsed >= duration) clearInterval(btn._countInterval);
                }, 50);

                /* PHASE 4 — After 9 s: scramble + hide text */
                btn._revealTimeout = setTimeout(function () {
                    btn._busy = true;
                    if (cdBar) cdBar.classList.remove('active');

                    textEl.classList.add('encrypting');
                    var hideIter  = 0;
                    var hideTotal = email.length * 2;

                    btn._decryptInterval = setInterval(function () {
                        textEl.textContent = email.split('').map(function (ch, idx) {
                            if (idx > email.length - Math.floor(hideIter / 2) - 1) {
                                return pool[Math.floor(Math.random() * pool.length)];
                            }
                            return ch;
                        }).join('');
                        hideIter++;

                        if (hideIter > hideTotal + 4) {
                            clearInterval(btn._decryptInterval);
                            textEl.textContent = '';
                            textEl.classList.remove('visible', 'encrypting');
                            if (cdFill) cdFill.style.width = '100%';

                            /* Re-enable interactions now that text is gone */
                            if (textEl._unblockActions) {
                                textEl._unblockActions();
                                textEl._unblockActions = null;
                            }

                            /* PHASE 5 — Eye closing (500 ms) */
                            btn.classList.remove('eye-open');
                            btn.classList.add('eye-closing');
                            btn.innerHTML = EYE_CLOSED_SVG;   // back to closed eye

                            setTimeout(function () {
                                btn.classList.remove('eye-closing');
                                btn._busy = false;
                            }, 500);
                        }
                    }, 40);
                }, duration);
            }
        }, 40);

    }, 550);
}

/** Radar Chart rendering (Canvas) */
function renderRadarChart() {
    var canvas = document.getElementById('radarChart');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    var centerX = size / 2;
    var centerY = size / 2;
    var maxRadius = 150;
    var labels = RADAR_DATA.labels;
    var values = RADAR_DATA.values;
    var n = labels.length;
    var angleStep = (2 * Math.PI) / n;
    var startAngle = -Math.PI / 2;

    // Read theme
    var isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    function getPoint(index, radius) {
        var angle = startAngle + index * angleStep;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    }

    // Draw grid circles
    var gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
    ctx.strokeStyle = isDark ? '#1e293b' : '#e2e8f0';
    ctx.lineWidth = 1;

    for (var g = 0; g < gridLevels.length; g++) {
        var r = maxRadius * gridLevels[g];
        ctx.beginPath();
        for (var i = 0; i <= n; i++) {
            var p = getPoint(i % n, r);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Draw axis lines
    ctx.strokeStyle = isDark ? '#2d3a4f' : '#cbd5e1';
    for (var i = 0; i < n; i++) {
        var p = getPoint(i, maxRadius);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    for (var i = 0; i < n; i++) {
        var radius = (values[i] / 100) * maxRadius;
        var p = getPoint(i, radius);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    for (var i = 0; i < n; i++) {
        var radius = (values[i] / 100) * maxRadius;
        var p = getPoint(i, radius);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = isDark ? '#0a0e1a' : '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = isDark ? '#94a3b8' : '#334155';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (var i = 0; i < n; i++) {
        var p = getPoint(i, maxRadius + 25);
        var angle = startAngle + i * angleStep;

        // Adjust text alignment based on position
        if (Math.cos(angle) > 0.1) ctx.textAlign = 'left';
        else if (Math.cos(angle) < -0.1) ctx.textAlign = 'right';
        else ctx.textAlign = 'center';

        ctx.fillText(labels[i], p.x, p.y);
    }
}

/** Animate metric bars on scroll into view */
function initMetricBars() {
    var bars = document.querySelectorAll('.metric-bar-fill');
    if (!bars.length) return;

    var observer = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('animated');
                observer.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.5 });

    for (var i = 0; i < bars.length; i++) {
        observer.observe(bars[i]);
    }
}

/** Resume viewer modal */
function initResumeViewer() {
    var viewBtn = document.getElementById('viewResumeBtn');
    if (!viewBtn) return;

    viewBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Check if resume data is available
        if (typeof RESUME_BASE64 !== 'undefined' && RESUME_BASE64 && RESUME_BASE64 !== 'PASTE_YOUR_BASE64_ENCODED_PDF_HERE') {
            var placeholder = document.getElementById('resumePlaceholder');
            var content = document.getElementById('resumeContent');
            if (placeholder) placeholder.classList.add('d-none');
            if (content) {
                content.classList.remove('d-none');

                // Only render once
                if (!content.hasAttribute('data-rendered')) {
                    content.setAttribute('data-rendered', 'true');
                    renderResumePdf(content);
                }
            }
        }

        // Open the modal
        var modal = new bootstrap.Modal(document.getElementById('resumeModal'));
        modal.show();

        // Track analytics event
        if (typeof trackEvent === 'function') {
            trackEvent('resume_view');
        }
    });
}

/**
 * Render PDF as canvas pages using PDF.js with clickable link overlays.
 * Prevents download while keeping embedded links functional.
 */
function renderResumePdf(container) {
    if (typeof pdfjsLib === 'undefined') {
        container.innerHTML = '<p class="text-center text-muted">PDF viewer is loading. Please try again.</p>';
        return;
    }

    // Configure PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

    // Decode base64 to binary
    var binaryStr = atob(RESUME_BASE64);
    var bytes = new Uint8Array(binaryStr.length);
    for (var i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
    }

    // Show loading state
    container.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Loading resume…</p></div>';

    pdfjsLib.getDocument({ data: bytes }).promise.then(function (pdf) {
        container.innerHTML = '';

        // Render each page
        var renderChain = Promise.resolve();
        for (var p = 1; p <= pdf.numPages; p++) {
            (function (pageNum) {
                renderChain = renderChain.then(function () {
                    return renderPdfPage(pdf, pageNum, container);
                });
            })(p);
        }

        renderChain.catch(function (err) {
            console.error('PDF render error:', err);
            container.innerHTML = '<p class="text-center text-danger">Failed to load resume. Please try again later.</p>';
        });
    }).catch(function (err) {
        console.error('PDF load error:', err);
        container.innerHTML = '<p class="text-center text-danger">Failed to load resume.</p>';
    });
}

/**
 * Render a single PDF page as a canvas with clickable link annotations overlaid.
 */
function renderPdfPage(pdf, pageNum, container) {
    return pdf.getPage(pageNum).then(function (page) {
        // Use 2x scale for crisp rendering, then CSS scale down
        var scale = 2;
        var viewport = page.getViewport({ scale: scale });

        // Page wrapper — positioned relative for link overlays
        var pageWrapper = document.createElement('div');
        pageWrapper.className = 'resume-page-wrapper';
        pageWrapper.style.position = 'relative';
        pageWrapper.style.width = '100%';
        pageWrapper.style.maxWidth = (viewport.width / scale) + 'px';
        pageWrapper.style.margin = '0 auto 16px auto';
        pageWrapper.style.userSelect = 'none';
        pageWrapper.style.webkitUserSelect = 'none';

        // Canvas for the page
        var canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.display = 'block';
        canvas.style.pointerEvents = 'none';
        canvas.setAttribute('draggable', 'false');

        pageWrapper.appendChild(canvas);
        container.appendChild(pageWrapper);

        // Render the page to canvas
        var ctx = canvas.getContext('2d');
        return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
            // Now extract link annotations and overlay clickable elements
            return page.getAnnotations();
        }).then(function (annotations) {
            var displayScale = pageWrapper.offsetWidth / (viewport.width / scale);

            for (var a = 0; a < annotations.length; a++) {
                var ann = annotations[a];
                if (ann.subtype === 'Link' && ann.url) {
                    // Convert PDF coordinates to CSS positions
                    var rect = ann.rect; // [x1, y1, x2, y2] in PDF units
                    var pdfPageHeight = viewport.height / scale;

                    var left = rect[0] * displayScale;
                    var bottom = rect[1] * displayScale;
                    var right = rect[2] * displayScale;
                    var top = rect[3] * displayScale;

                    var linkEl = document.createElement('a');
                    linkEl.href = ann.url;
                    linkEl.target = '_blank';
                    linkEl.rel = 'noopener noreferrer';
                    linkEl.title = ann.url;
                    linkEl.style.position = 'absolute';
                    linkEl.style.left = left + 'px';
                    linkEl.style.top = (pdfPageHeight * displayScale - top) + 'px';
                    linkEl.style.width = (right - left) + 'px';
                    linkEl.style.height = (top - bottom) + 'px';
                    linkEl.style.cursor = 'pointer';
                    linkEl.style.zIndex = '2';
                    // Transparent overlay — visible on hover
                    linkEl.style.background = 'transparent';
                    linkEl.style.border = 'none';
                    linkEl.style.borderRadius = '2px';
                    linkEl.style.transition = 'background 0.2s ease';
                    linkEl.addEventListener('mouseenter', function () {
                        this.style.background = 'rgba(59, 130, 246, 0.12)';
                    });
                    linkEl.addEventListener('mouseleave', function () {
                        this.style.background = 'transparent';
                    });

                    pageWrapper.appendChild(linkEl);
                }
            }
        });
    });
}

/** Console easter egg */
function initConsoleEasterEgg() {
    var art = [
        '%c╔══════════════════════════════════════╗',
        '║  Hey there, curious one!              ║',
        '║  Pratik Anil Pawar                    ║',
        '║  InfoSec Engineer | Blue Team         ║',
        '║  pawar.pratik@hotmail.com             ║',
        '║  linkedin.com/in/pratik-a-pawar       ║',
        '╚══════════════════════════════════════╝'
    ].join('\n');

    console.log(art, 'color: #3b82f6; font-family: monospace; font-size: 12px;');
}

/** Redraw radar chart on theme change (observer) */
(function () {
    var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].attributeName === 'data-theme') {
                renderRadarChart();
            }
        }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();


/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Escape HTML entities to prevent XSS.
 * @param {string} str - Raw string
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}


/* ============================================
   CURSOR PARTICLE TRAIL — Cyber Network Effect
   ============================================ */

/**
 * Initializes a canvas-based particle system that responds to mouse movement.
 * Particles spawn near the cursor, drift outward, and form brief network
 * connections with nearby particles — giving a "data flow" cybersecurity feel.
 */
function initCursorParticles() {
    var canvas = document.getElementById('cursorParticles');
    if (!canvas || !canvas.getContext) return;

    // Skip on devices without a fine pointer (pure touch phones/tablets)
    if (window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches) {
        canvas.style.display = 'none';
        return;
    }

    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = -9999;
    var mouseY = -9999;
    var isHovering = false;
    var animId = null;
    var MAX_PARTICLES = 120;
    var CONNECT_DIST = 150;
    var SPAWN_RATE = 5; // particles per frame while moving

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isHovering = true;
        spawnParticles();
    });

    document.addEventListener('mouseleave', function () {
        isHovering = false;
        mouseX = -9999;
        mouseY = -9999;
    });

    function spawnParticles() {
        if (!isHovering) return;
        var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        for (var i = 0; i < SPAWN_RATE; i++) {
            if (particles.length >= MAX_PARTICLES) break;
            var angle = Math.random() * Math.PI * 2;
            var speed = 0.5 + Math.random() * 1.5;
            var isAmber = Math.random() < 0.25; // 25% amber sparks
            particles.push({
                x: mouseX + (Math.random() - 0.5) * 10,
                y: mouseY + (Math.random() - 0.5) * 10,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.005 + Math.random() * 0.008,
                size: 2.5 + Math.random() * 3.5,
                color: isAmber
                    ? (isDark ? '245, 158, 11' : '217, 119, 6')    // amber
                    : (isDark ? '59, 130, 246' : '37, 99, 235')    // blue
            });
        }
    }

    function update() {
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.985;
            p.vy *= 0.985;
            p.vy += 0.01; // subtle gravity drift
            p.life -= p.decay;
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections between nearby particles
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    var alpha = (1 - dist / CONNECT_DIST) * Math.min(particles[i].life, particles[j].life) * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(' + particles[i].color + ', ' + alpha + ')';
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var alpha = p.life * 0.9;

            // Glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color + ', ' + (alpha * 0.2) + ')';
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color + ', ' + (alpha * 0.95) + ')';
            ctx.fill();
        }
    }

    function loop() {
        update();
        draw();
        animId = requestAnimationFrame(loop);
    }

    loop();
}

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */

/**
 * Creates a soft glowing dot + ring that follows the cursor.
 * The glow expands when hovering over interactive elements (links, buttons, cards)
 * giving a sleek, cybersecurity-dashboard feel without being over-the-top.
 */
function initCursorGlow() {
    // Skip on touch-only devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches) {
        return;
    }

    // Create glow spotlight
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var mouseX = -100;
    var mouseY = -100;
    var glowX = -100;
    var glowY = -100;
    var fadeTimer = null;

    // Interactive selectors that trigger the "expand" effect
    var interactiveSelectors = 'a, button, .btn, .social-icon-link, .project-card, .cert-card, .casefile-card, .blog-card, .contact-card, .nav-link, .theme-toggle-btn, input, textarea';

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show glow on movement
        if (!glow.classList.contains('visible')) {
            glow.classList.add('visible');
        }

        // Reset the fade-out timer on every move
        clearTimeout(fadeTimer);
        fadeTimer = setTimeout(function () {
            glow.classList.remove('visible');
        }, 300); // fade out 300ms after mouse stops

        // Check if hovering over interactive element
        var target = e.target;
        var isInteractive = target.closest(interactiveSelectors);

        if (isInteractive) {
            glow.classList.add('hovering-interactive');
        } else {
            glow.classList.remove('hovering-interactive');
        }
    });

    document.addEventListener('mouseleave', function () {
        glow.classList.remove('visible');
        clearTimeout(fadeTimer);
    });

    // Click burst — spawn a burst element on every click
    document.addEventListener('click', function (e) {
        var burst = document.createElement('div');
        burst.className = 'cursor-click-burst';
        burst.style.left = e.clientX + 'px';
        burst.style.top = e.clientY + 'px';
        document.body.appendChild(burst);

        // Trigger animation on next frame
        requestAnimationFrame(function () {
            burst.classList.add('active');
        });

        // Remove after animation
        setTimeout(function () {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 550);
    });

    // Smooth follow using lerp — tight follow for natural feel
    function animate() {
        glowX += (mouseX - glowX) * 0.25;
        glowY += (mouseY - glowY) * 0.25;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}


/* ============================================
   SOCIAL ICON CLICK EFFECTS
   ============================================ */

/**
 * Adds a ripple burst animation on social icon click.
 * The ripple element expands outward and fades, giving
 * satisfying tactile feedback without being distracting.
 */
function initSocialIconEffects() {
    var socialLinks = document.querySelectorAll('.social-icon-link, .footer-social a');

    for (var i = 0; i < socialLinks.length; i++) {
        socialLinks[i].addEventListener('click', function () {
            var link = this;
            // Remove previous animation if still running
            link.classList.remove('clicked');
            // Force reflow to restart animation
            void link.offsetWidth;
            link.classList.add('clicked');

            // Clean up class after animation completes
            setTimeout(function () {
                link.classList.remove('clicked');
            }, 600);
        });

        // Magnetic pull effect — icon subtly follows cursor within the circle
        socialLinks[i].addEventListener('mousemove', function (e) {
            var rect = this.getBoundingClientRect();
            var centerX = rect.left + rect.width / 2;
            var centerY = rect.top + rect.height / 2;
            var deltaX = (e.clientX - centerX) * 0.2;
            var deltaY = (e.clientY - centerY) * 0.2;

            var inner = this.querySelector('i') || this.querySelector('.social-logo');
            if (inner) {
                inner.style.transform =
                    'translate(' + deltaX + 'px, ' + deltaY + 'px)';
            }
        });

        socialLinks[i].addEventListener('mouseleave', function () {
            var inner = this.querySelector('i') || this.querySelector('.social-logo');
            if (inner) {
                inner.style.transform = 'translate(0, 0)';
                inner.style.transition = 'transform 0.3s ease';
                setTimeout(function () {
                    inner.style.transition = '';
                }, 300);
            }
        });
    }
}


/* ============================================
   MAGNETIC TILT EFFECT ON CARDS
   ============================================ */

/**
 * Adds a subtle 3D tilt effect to major cards across the site.
 * The card tilts toward the cursor position, creating a "data panel"
 * feel that's cool without being distracting or "fancy."
 *
 * Uses perspective transform — max tilt is kept low (4deg) for subtlety.
 */
function initMagneticTilt() {
    // Skip on touch-only devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches) {
        return;
    }

    var tiltSelectors = [
        '.project-card',
        '.cert-card',
        '.casefile-card',
        '.blog-card',
        '.education-card',
        '.achievement-card',
        '.contact-card',
        '.experience-item'
    ];

    var cards = document.querySelectorAll(tiltSelectors.join(','));
    var MAX_TILT = 4; // degrees — subtle, not fancy

    for (var i = 0; i < cards.length; i++) {
        (function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;

                // Normalize to -1 to 1
                var rotateY = ((x - centerX) / centerX) * MAX_TILT;
                var rotateX = ((centerY - y) / centerY) * MAX_TILT;

                card.style.transform =
                    'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease';
                setTimeout(function () {
                    card.style.transition = '';
                }, 500);
            });

            card.addEventListener('mouseenter', function () {
                card.style.transition = 'box-shadow 0.35s ease';
            });
        })(cards[i]);
    }
}
