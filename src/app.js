const express = require('express');
const upload = require('./middlewares/upload');
const auth = require('./middlewares/auth');
const calculateChecksum = require('./utils/checksum');

const {publicDirPath} = require('./config');

const app = express();

app.use(auth);
app.use(express.static(publicDirPath));
app.use(function(req, res, next) {
  res.setHeader('Content-Security-Policy', 'default-src \'self\';');
  next();
});

app.post('/upload', upload.single('uploaded_file'), async (req, res) => {
  const hash = await calculateChecksum(req.file.path);

  res.status(201).json({
    hash,
  });
});

module.exports = app;
