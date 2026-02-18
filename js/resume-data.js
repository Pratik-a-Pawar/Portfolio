/**
 * resume-data.js — Resume Data Store
 * Pratik Anil Pawar — Portfolio
 *
 * ============================================================
 * HOW TO ADD YOUR RESUME:
 *
 * 1. Go to https://base64.guru/converter/encode/pdf
 *    (or use any Base64 encoder — command line works too:
 *     base64 -i your-resume.pdf -o resume-base64.txt   on macOS/Linux
 *     certutil -encode your-resume.pdf resume-base64.txt   on Windows)
 *
 * 2. Open your PDF file and encode it to Base64.
 *
 * 3. Copy the ENTIRE Base64 string (it will be very long).
 *
 * 4. Replace "PASTE_YOUR_BASE64_ENCODED_PDF_HERE" below with
 *    the Base64 string. Keep it inside the quotes.
 *
 * 5. Save this file. The resume viewer will automatically
 *    render it when "View Resume" is clicked.
 *
 * NOTES:
 * - The Base64 string will be very long (thousands of characters).
 *   This is normal.
 * - Do NOT include the "data:application/pdf;base64," prefix —
 *   that is added automatically by the viewer script.
 * - Keep this file in the js/ directory.
 * - The resume is displayed view-only in a modal. No download
 *   button is provided intentionally.
 * ============================================================
 */

var RESUME_BASE64 = 'PASTE_YOUR_BASE64_ENCODED_PDF_HERE';
