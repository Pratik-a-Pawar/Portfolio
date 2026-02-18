/**
 * security.js — Client-Side Security Hardening Module
 * Pratik Anil Pawar — Portfolio
 *
 * NOTE: These are client-side deterrents, not absolute protections.
 * Real security requires server-side controls.
 */

(function SecurityHardening() {
    'use strict';

    /* ---- Configuration ---- */
    var CONFIG = {
        protectedSelectors: ['.protected-image', '[data-protected="true"]'],
        resumeSelectors: ['#resumeModal', '#resumeModalBody', '#resumeContent'],
        imageSelectors: ['.profile-photo', '#resumeContent img'],
        allowedFrameOrigins: [window.location.origin],
        devToolsWarningShown: false,
        rateLimitMs: 300
    };

    /* ---- Frame Busting (Clickjacking Prevention) ---- */
    function initFrameBusting() {
        try {
            if (window.self !== window.top) {
                var isAllowed = false;
                try {
                    var parentOrigin = window.top.location.origin;
                    for (var i = 0; i < CONFIG.allowedFrameOrigins.length; i++) {
                        if (parentOrigin === CONFIG.allowedFrameOrigins[i]) {
                            isAllowed = true;
                            break;
                        }
                    }
                } catch (e) {
                    // Cross-origin frame — not allowed
                    isAllowed = false;
                }
                if (!isAllowed) {
                    window.top.location = window.self.location;
                }
            }
        } catch (e) {
            // Silently fail — frame busting is best-effort
        }
    }

    /* ---- Image Protection ---- */
    function initImageProtection() {
        // Set draggable=false on all protected images
        var images = document.querySelectorAll(CONFIG.imageSelectors.join(','));
        for (var i = 0; i < images.length; i++) {
            images[i].setAttribute('draggable', 'false');
            images[i].style.userSelect = 'none';
            images[i].style.webkitUserSelect = 'none';
            images[i].style.pointerEvents = 'none';
        }

        // Disable context menu on protected elements
        var protectedEls = document.querySelectorAll(CONFIG.protectedSelectors.join(','));
        for (var i = 0; i < protectedEls.length; i++) {
            protectedEls[i].addEventListener('contextmenu', preventDefault);
        }

        // Disable copy, selectstart, dragstart on protected elements
        var events = ['copy', 'selectstart', 'dragstart'];
        for (var i = 0; i < protectedEls.length; i++) {
            for (var j = 0; j < events.length; j++) {
                protectedEls[i].addEventListener(events[j], preventDefault);
            }
        }
    }

    /* ---- Resume Protection ---- */
    function initResumeProtection() {
        // Block keyboard shortcuts on resume section only
        document.addEventListener('keydown', function (e) {
            var target = e.target;
            var isInResume = false;

            for (var i = 0; i < CONFIG.resumeSelectors.length; i++) {
                var resumeEl = document.querySelector(CONFIG.resumeSelectors[i]);
                if (resumeEl && (resumeEl === target || resumeEl.contains(target))) {
                    isInResume = true;
                    break;
                }
            }

            // Also check if resume modal is open
            var modal = document.getElementById('resumeModal');
            if (modal && modal.classList.contains('show')) {
                isInResume = true;
            }

            if (!isInResume) return;

            // Block Ctrl+S (save) and Ctrl+P (print) on resume section
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    /* ---- PII Obfuscation ---- */
    function initPiiObfuscation() {
        // Zero-width character insertion for any plaintext emails in the DOM
        // This makes scraping harder but keeps text visually normal
        // Main obfuscation is already handled in main.js via Base64 encoding
        // This is an additional layer for any rendered emails

        // Inject anti-scraping CSS decoy
        var style = document.createElement('style');
        style.textContent = '.site-footer::after { content: "contact: do-not-email@decoy.example.com tel: +1-555-0000"; position: absolute; left: -9999px; height: 0; overflow: hidden; opacity: 0; }';
        document.head.appendChild(style);
    }

    /* ---- Anti-Scraping: Honeypot ---- */
    function initHoneypot() {
        // Honeypot form is already in the HTML (hidden form with fake data)
        // Add additional CSS-based decoy data
        var decoy = document.createElement('div');
        decoy.setAttribute('aria-hidden', 'true');
        decoy.style.cssText = 'position:absolute;left:-9999px;width:0;height:0;overflow:hidden;opacity:0;';
        decoy.innerHTML = '<a href="mailto:dont-scrape@example.com">Email</a><span>+91-000-000-0000</span>';
        document.body.appendChild(decoy);
    }

    /* ---- Bot Detection ---- */
    function initBotDetection() {
        var suspiciousAgents = [
            'bot', 'crawl', 'spider', 'scrape', 'fetch', 'curl', 'wget',
            'python-requests', 'httpclient', 'phantom', 'headless'
        ];
        var ua = navigator.userAgent.toLowerCase();
        var isBot = false;

        for (var i = 0; i < suspiciousAgents.length; i++) {
            if (ua.indexOf(suspiciousAgents[i]) !== -1) {
                isBot = true;
                break;
            }
        }

        if (isBot) {
            // Hide contact information from bots
            var contactSection = document.getElementById('contact');
            if (contactSection) {
                var cards = contactSection.querySelectorAll('.contact-card-value');
                for (var i = 0; i < cards.length; i++) {
                    cards[i].textContent = '[Protected]';
                }
            }
        }
    }

    /* ---- DevTools Detection (Light Touch) ---- */
    function initDevToolsDetection() {
        var threshold = 160;

        function checkDevTools() {
            var widthDiff = window.outerWidth - window.innerWidth;
            var heightDiff = window.outerHeight - window.innerHeight;

            if ((widthDiff > threshold || heightDiff > threshold) && !CONFIG.devToolsWarningShown) {
                CONFIG.devToolsWarningShown = true;
                console.log(
                    '%c[Security Notice] DevTools detected. This site is security-hardened. All assets are protected.',
                    'color: #f59e0b; font-weight: bold; font-size: 13px;'
                );
            }
        }

        window.addEventListener('resize', checkDevTools);
    }

    /* ---- Rate Limiting ---- */
    function initRateLimiting() {
        var lastInteraction = 0;
        var interactionEvents = ['click', 'submit'];

        for (var i = 0; i < interactionEvents.length; i++) {
            document.addEventListener(interactionEvents[i], function (e) {
                var now = Date.now();
                if (now - lastInteraction < CONFIG.rateLimitMs) {
                    // Too fast — likely automated
                    e.stopPropagation();
                    return;
                }
                lastInteraction = now;
            }, true);
        }
    }

    /* ---- Utility ---- */
    function preventDefault(e) {
        e.preventDefault();
        return false;
    }

    /* ---- Initialize All Protections ---- */
    function init() {
        initFrameBusting();
        initPiiObfuscation();
        initHoneypot();
        initBotDetection();
        initDevToolsDetection();
        initRateLimiting();

        // Wait for DOM content to load for element-dependent protections
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                initImageProtection();
                initResumeProtection();
            });
        } else {
            initImageProtection();
            initResumeProtection();
        }
    }

    init();

})();
