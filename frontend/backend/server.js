const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-cv', (req, res) => {
  const cvData = req.body;
  console.log('CV Submitted:', cvData);
  res.json({ status: 'success', message: 'CV received!' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
