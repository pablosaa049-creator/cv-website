const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('frontend'));

app.post('/api/submit-cv', (req, res) => {
    // Handle CV submission
    res.send('CV submitted!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
