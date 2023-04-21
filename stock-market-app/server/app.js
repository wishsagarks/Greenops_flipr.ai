const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve frontend build folder
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/stocks', (req, res) => {
  const pythonProcess = spawn('python', ['./backend/knn_mom.py']);
  pythonProcess.stdout.on('data', (data) => {
    res.send(JSON.parse(data.toString()));
  });
});

app.get('/api/stocks/:stock_name', (req, res) => {
  const stock_name = req.params.stock_name;
  const pythonProcess = spawn('python', ['./backend/knn_mom.py', stock_name]);
  pythonProcess.stdout.on('data', (data) => {
    res.send(JSON.parse(data.toString()));
  });
});

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
