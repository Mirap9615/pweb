const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');



const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../dist')));

app.post('/api/register', (req, res) => {
  console.log("Received registration request");
  res.status(200).json({ message: 'User registered successfullyy' });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
