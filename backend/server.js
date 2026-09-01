const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// GET /
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// GET /api/test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
