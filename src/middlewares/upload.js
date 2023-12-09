const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {uploadDir} = require('../config');

/**
 * Returns UTF-8 encoded file name
 * @param {String} originalFileName
 * @return {String} utf-8 encoded file name
 */
function getUtf8FileName(originalFileName) {
  return Buffer.from(originalFileName, 'latin1').toString('utf8');
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const fileName = getUtf8FileName(file.originalname);

    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileName = getUtf8FileName(file.originalname);

    if (fs.existsSync(path.join(uploadDir, fileName))) {
      cb('Cannot upload file.', false);
    }
    cb(null, true);
  },
});

module.exports = upload;
