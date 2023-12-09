const crypto = require('crypto');
const fs = require('fs');

/**
 * Calculates file's checksum
 * @param {String} path
 * @return {Promise}
 */
function calculateChecksum(path) {
  const hash = crypto.createHash('sha256');
  const readStream = fs.createReadStream(path);

  return new Promise((resolve, reject) => {
    readStream.on('error', reject);

    readStream.on('data', function(chunk) {
      hash.update(chunk);
    });

    readStream.on('close', function() {
      resolve(hash.digest('hex'));
    });
  });
}

module.exports = calculateChecksum;
