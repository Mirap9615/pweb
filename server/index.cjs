const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../dist')));

// the api endpoint for the server to handle register-related requests 
app.post('/api/register', (req, res) => {
  console.log("Received registration request");
  res.status(200).json({ message: 'User registered successfully' });
});

// the api endpoint for the server to handle cursor-related requests
app.post('/api/setCursor', (req, res) => {
  const { isCursorPurchased } = req.body;
  res.cookie('cursorPurchased', isCursorPurchased, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: 'Cursor preference saved' });
});

// endpoint to get the cursor state based on the cookie
app.get('/api/getCursorState', (req, res) => {
  const isCursorPurchased = req.cookies.cursorPurchased === 'true'; 
  res.status(200).json({ isCursorPurchased });
});

// endpoint to get the count number
app.get('/api/getIncrementCount', (req, res) => {
  const IncrementCount = req.cookies.IncrementCount; 
  res.status(200).json({ IncrementCount });
});

// endpoint to increment the count number
app.post('/api/setIncrementCount', (req, res) => {
  let currentCount = Number(req.cookies.IncrementCount || 0);
  currentCount += 1; 
  
  res.cookie('IncrementCount', currentCount, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: 'Increment Count Incremented', IncrementCount: currentCount });
});

// endpoint to decrement the counter number
app.post('/api/decrementCount', (req, res) => {
  let currentCount = Number(req.cookies.IncrementCount || 0);
  currentCount = currentCount > 0 ? currentCount - 1 : 0; // ensure count doesn't go below 0

  res.cookie('IncrementCount', currentCount, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ message: 'Increment Count Decremented', IncrementCount: currentCount });
});

// endpoint to decrement the cost of a purchased good 
app.post('/api/decrementPurchaseAmount', (req, res) => {
  let currentCount = Number(req.cookies.IncrementCount || 0);
  const cost = req.body.cost;
  
  if (currentCount >= cost) {
    currentCount -= cost;
    res.cookie('IncrementCount', currentCount, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Purchase successful', success: true });
  } else {
    res.status(400).json({ message: 'Not enough count for this purchase', success: false });
  }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
