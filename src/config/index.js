const path = require('path');

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../../public');
const user = process.env.USER;
const password = process.env.PASSWORD;
const uploadDir = process.env.UPLOADDIR;

if (!user || !password) {
  console.error('Please configure user and password.');
  process.exit(1);
}

if (!uploadDir) {
  console.error('Please configure upload directory.');
  process.exit(1);
}

module.exports = {
  port,
  publicDirPath,
  uploadDir,
  user,
  password,
};
