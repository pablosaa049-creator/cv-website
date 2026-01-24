# cv-website

Simple CV builder with a small API endpoint.

Quick start (development)
1. Copy the example env and set credentials if you want email sending:
   cp .env.example .env
   (then edit .env)

2. Install dependencies:
   npm install

3. Start dev server:
   npm run dev

4. Open http://localhost:5000/ in your browser.

Notes
- The backend will attempt to use EmailJS if the following env vars are set:
  - EMAILJS_SERVICE_ID
  - EMAILJS_TEMPLATE_ID
  - EMAILJS_PUBLIC_KEY

- If you don't configure EmailJS the server will still accept submissions and respond with an acknowledgement (useful for local dev).

- Accessibility: labels are associated to inputs by id/for, and status messages use a live region.