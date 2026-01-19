const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const emailjs = require('@emailjs/nodejs'); // used only if env vars are provided

const app = express();
const PORT = process.env.PORT || 5000;

// JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files from ../frontend
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));

// POST API to receive CV submissions — matches client fetch('/api/submit-cv')
app.post('/api/submit-cv', async (req, res) => {
  const cvData = req.body;
  console.log('CV Submitted:', cvData);

  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY
  } = process.env;

  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        cvData,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      return res.json({ status: 'success', message: 'CV sent successfully!' });
    } catch (err) {
      console.error('EmailJS send failed:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to send CV via EmailJS' });
    }
  }

  // No EmailJS configured — acknowledge receipt for dev
  res.json({
    status: 'success',
    message: 'CV received (dev). Configure EMAILJS_* env vars to enable emailing.'
  });
});

// Fallback to index.html for any other GET (client routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});