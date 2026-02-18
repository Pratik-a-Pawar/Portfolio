/**
 * analytics.js — Umami Analytics Configuration
 * Pratik Anil Pawar — Portfolio
 *
 * HOW TO SET UP UMAMI ANALYTICS:
 * 1. Create a free account at https://cloud.umami.is
 * 2. Add your website (https://pratik-a-pawar.github.io/portfolio)
 * 3. Copy the Website ID from Umami dashboard
 * 4. Paste it below in ANALYTICS_CONFIG.websiteId
 * 5. Set enabled to true
 *
 * Umami is privacy-focused: no cookies, no personal data, GDPR compliant.
 */

var ANALYTICS_CONFIG = {
    enabled: false,  // Kill-switch: set to true to enable tracking
    websiteId: 'YOUR_UMAMI_WEBSITE_ID',  // Replace with your Umami website ID
    src: 'https://cloud.umami.is/script.js'
};

/**
 * Load the Umami tracking script if analytics is enabled.
 */
(function initAnalytics() {
    'use strict';

    if (!ANALYTICS_CONFIG.enabled) return;
    if (!ANALYTICS_CONFIG.websiteId || ANALYTICS_CONFIG.websiteId === 'YOUR_UMAMI_WEBSITE_ID') return;

    var script = document.createElement('script');
    script.defer = true;
    script.src = ANALYTICS_CONFIG.src;
    script.setAttribute('data-website-id', ANALYTICS_CONFIG.websiteId);
    document.head.appendChild(script);
})();

/**
 * Track a custom event with Umami.
 * Call this from main.js for specific interactions.
 *
 * @param {string} eventName - Name of the event to track
 *
 * Tracked events:
 *   - 'resume_view'   : When the resume modal/section is opened
 *   - 'email_reveal'  : When the eye-toggle is clicked on the email contact card
 *   - 'project_github': When a GitHub link is clicked on any project
 */
function trackEvent(eventName) {
    'use strict';

    if (!ANALYTICS_CONFIG.enabled) return;
    if (typeof window.umami === 'undefined') return;

    try {
        window.umami.track(eventName);
    } catch (e) {
        // Silently fail — analytics should never break the site
    }
}
