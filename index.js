const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 2300;

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve the index.html file with the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  res.send(`<h2>File Contents:</h2><pre>${fileContent}</pre>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
