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
        icon: 'bi-shield-fill-check'
    },
    {
        title: 'Google Cybersecurity Specialization',
        issuer: 'Coursera (Google)',
        status: 'completed',
        icon: 'bi-google'
    },
    {
        title: 'Cisco SOC (Security Operations Center)',
        issuer: 'Coursera (Cisco)',
        status: 'completed',
        icon: 'bi-hdd-network'
    },
    {
        title: 'TryHackMe SAL1 (Security Analyst Level 1)',
        issuer: 'TryHackMe',
        status: 'in_progress',
        icon: 'bi-flag'
    },
    {
        title: 'TryHackMe PT1 (Junior Penetration Tester)',
        issuer: 'TryHackMe',
        status: 'in_progress',
        icon: 'bi-bug'
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
        period: '2024 – Present',
        description: 'Completed real-world SOC alert triage scenarios including phishing analysis, malware alerts, and suspicious network activity investigations. Practiced incident escalation and documentation procedures.',
        icon: 'bi-shield-fill'
    },
    {
        title: 'TryHackMe Hands-On Labs',
        period: '2024 – Present',
        description: 'Active on TryHackMe completing rooms in network security, web application security, and incident response. Currently on the SAL1 (Security Analyst Level 1) and PT1 (Junior Penetration Tester) learning paths.',
        icon: 'bi-terminal-fill'
    },
    {
        title: 'n8n Security Automation Development',
        period: '2024',
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

/** Contact information — email and LinkedIn stored as Base64 segments for obfuscation */
const CONTACT_INFO = [
    {
        label: 'Email',
        icon: 'bi-envelope-fill',
        maskedValue: 'p*****@hotmail.com',
        // Base64-encoded segments for obfuscation (assembled in JS, not stored as plaintext in HTML)
        valueParts: ['cGF3YXIu', 'cHJhdGlr', 'QGhvdG1haWwuY29t'],
        isMasked: true,
        isLink: true,
        linkPrefix: 'mailto:'
    },
    {
        label: 'LinkedIn',
        icon: 'bi-linkedin',
        maskedValue: 'linkedin.com/in/p*****',
        valueParts: ['aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3ByYXRpay1hLXBhd2FyLw=='],
        isMasked: true,
        isLink: true,
        linkPrefix: ''
    },
    {
        label: 'GitHub',
        icon: 'bi-github',
        maskedValue: null,
        fullValue: 'github.com/Pratik-a-Pawar',
        fullUrl: 'https://github.com/Pratik-a-Pawar',
        isMasked: false,
        isLink: true,
        linkPrefix: ''
    },
    {
        label: 'Location',
        icon: 'bi-geo-alt-fill',
        maskedValue: null,
        fullValue: 'Pune, Maharashtra, India',
        isMasked: false,
        isLink: false
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
        initHeroTyping,
        initTerminalAnimation,
        initTriageDemo,
        initResumeViewer,
        initConsoleEasterEgg,
        initCursorParticles
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
        html += '<div class="cert-card">';
        html += '<div class="cert-icon"><i class="bi ' + cert.icon + '"></i></div>';
        html += '<div class="cert-card-title">' + escapeHtml(cert.title) + '</div>';
        html += '<div class="cert-issuer">' + escapeHtml(cert.issuer) + '</div>';
        html += '<div class="cert-badge ' + badgeClass + '">' + badgeText + '</div>';
        html += '</div></div>';
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
    html += '<div class="achievement-card">';
    html += '<div class="achievement-icon"><i class="bi bi-trophy-fill"></i></div>';
    html += '<div class="achievement-title">National Mathematics Day — Quiz Competition Winner</div>';
    html += '<div class="achievement-desc">Captured 1st Rank in Quiz Competition, National Mathematics Day 2023, awarded by Solapur University.</div>';
    html += '</div></div>';
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

/** Render contact cards with eye-toggle reveal */
function renderContact() {
    var container = document.getElementById('contactContainer');
    if (!container) return;
    var html = '';
    for (var i = 0; i < CONTACT_INFO.length; i++) {
        var info = CONTACT_INFO[i];
        html += '<div class="col-lg-3 col-md-6 mb-4 scroll-reveal">';
        html += '<div class="contact-card">';
        html += '<div class="contact-card-icon"><i class="bi ' + info.icon + '"></i></div>';
        html += '<div class="contact-card-label">' + escapeHtml(info.label) + '</div>';
        html += '<div class="contact-card-value">';

        if (info.isMasked) {
            html += '<span class="contact-masked-value" id="contactVal' + i + '">' + escapeHtml(info.maskedValue) + '</span>';
            html += '<button class="eye-toggle-btn" data-contact-index="' + i + '" aria-label="Reveal ' + escapeHtml(info.label) + '">';
            html += '<i class="bi bi-eye"></i>';
            html += '</button>';
        } else if (info.isLink) {
            html += '<a href="' + escapeHtml(info.fullUrl) + '" target="_blank" rel="noopener noreferrer" style="color:var(--accent-blue);text-decoration:none;">' + escapeHtml(info.fullValue) + '</a>';
        } else {
            html += '<span>' + escapeHtml(info.fullValue) + '</span>';
        }

        html += '</div>';
        if (info.isMasked) {
            html += '<div class="reveal-countdown" id="contactCountdown' + i + '"><div class="reveal-countdown-fill" id="contactCountdownFill' + i + '"></div></div>';
        }
        html += '</div></div>';
    }
    container.innerHTML = html;

    // Attach eye-toggle event listeners
    var toggleBtns = container.querySelectorAll('.eye-toggle-btn');
    for (var b = 0; b < toggleBtns.length; b++) {
        toggleBtns[b].addEventListener('click', handleContactReveal);
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

/** Scroll-reveal using IntersectionObserver */
function initScrollReveal() {
    var elements = document.querySelectorAll('.scroll-reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        // Fallback: show all immediately
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('revealed');
        }
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('revealed');
                observer.unobserve(entries[i].target);
            }
        }
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    for (var i = 0; i < elements.length; i++) {
        observer.observe(elements[i]);
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

/** Contact eye-toggle reveal with 10-second auto-mask */
function handleContactReveal(e) {
    var btn = e.currentTarget;
    var index = parseInt(btn.getAttribute('data-contact-index'), 10);
    var info = CONTACT_INFO[index];
    var valueEl = document.getElementById('contactVal' + index);
    var countdownEl = document.getElementById('contactCountdown' + index);
    var fillEl = document.getElementById('contactCountdownFill' + index);

    if (!valueEl || !info || !info.isMasked) return;

    // Decode the value from Base64 parts
    var decoded = '';
    if (info.valueParts) {
        for (var i = 0; i < info.valueParts.length; i++) {
            decoded += atob(info.valueParts[i]);
        }
    }

    // If email, join parts with special order: pawar. + pratik + @hotmail.com
    // The parts are already ordered in the data array
    valueEl.textContent = decoded;
    btn.querySelector('i').className = 'bi bi-eye-slash';

    // Show countdown
    if (countdownEl) {
        countdownEl.classList.add('active');
    }

    // Track analytics event
    if (typeof trackEvent === 'function') {
        trackEvent('email_reveal');
    }

    // Auto-mask after 10 seconds with countdown animation
    var duration = 10000;
    var startTime = Date.now();

    var countdownInterval = setInterval(function () {
        var elapsed = Date.now() - startTime;
        var remaining = Math.max(0, 1 - elapsed / duration);
        if (fillEl) {
            fillEl.style.width = (remaining * 100) + '%';
        }
        if (elapsed >= duration) {
            clearInterval(countdownInterval);
        }
    }, 50);

    var timeout = setTimeout(function () {
        valueEl.textContent = info.maskedValue;
        btn.querySelector('i').className = 'bi bi-eye';
        if (countdownEl) {
            countdownEl.classList.remove('active');
        }
        if (fillEl) {
            fillEl.style.width = '100%';
        }
    }, duration);

    // Store timeout reference for cleanup
    if (btn._revealTimeout) {
        clearTimeout(btn._revealTimeout);
        clearInterval(btn._countdownInterval);
    }
    btn._revealTimeout = timeout;
    btn._countdownInterval = countdownInterval;
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
                // Render as embedded object or image
                content.innerHTML = '<embed src="data:application/pdf;base64,' + RESUME_BASE64 + '" type="application/pdf" width="100%" height="700px" style="border:none;pointer-events:auto;">';
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
    var MAX_PARTICLES = 100;
    var CONNECT_DIST = 140;
    var SPAWN_RATE = 4; // particles per frame while moving

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
            var isAmber = Math.random() < 0.2; // 20% amber sparks
            particles.push({
                x: mouseX + (Math.random() - 0.5) * 10,
                y: mouseY + (Math.random() - 0.5) * 10,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.006 + Math.random() * 0.01,
                size: 2 + Math.random() * 3,
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
            p.vx *= 0.99;
            p.vy *= 0.99;
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
                    var alpha = (1 - dist / CONNECT_DIST) * Math.min(particles[i].life, particles[j].life) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(' + particles[i].color + ', ' + alpha + ')';
                    ctx.lineWidth = 0.5;
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
            ctx.fillStyle = 'rgba(' + p.color + ', ' + (alpha * 0.15) + ')';
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color + ', ' + alpha + ')';
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
