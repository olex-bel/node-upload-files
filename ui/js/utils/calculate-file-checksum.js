
/**
 * Calculates checksum of the file.
 * @param {File} file
 * @param {Function} cbProgress
 * @return {Promise}
 */
function calculateFileChecksum(file, cbProgress) {
  const chunkSize = 1 * 1024 * 1024;

  return new Promise((resolve, reject) => {
    const hashObj = CryptoJS.algo.SHA256.create();
    const fileSize = file.size;
    let offset = 0;
    const reader = new FileReader();

    reader.onload = function() {
      if (reader.error) {
        return reject(reader.error);
      }
      hashObj.update(CryptoJS.enc.Latin1.parse(reader.result));

      offset += reader.result.length;
      if (cbProgress) {
        cbProgress(offset / fileSize);
      }

      if (offset >= fileSize) {
        const hash = hashObj.finalize();
        const hashHex = hash.toString(CryptoJS.enc.Hex);
        return resolve(hashHex);
      }
      readNext();
    };

    reader.onerror = function(err) {
      reject(err);
    };

    /**
     * 
     */
    function readNext() {
      const fileSlice = file.slice(offset, offset + chunkSize);
      reader.readAsBinaryString(fileSlice);
    }

    readNext();
  });
}

module.exports = calculateFileChecksum;
