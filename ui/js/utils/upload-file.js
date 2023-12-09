/**
 * Send file to a server
 * @param {String} url
 * @param {File} file
 * @param {Function} cbProgress
 * @return {Promise}
 */
function uploadFile(url, file, cbProgress) {
  const formdata = new FormData();
  const request = new XMLHttpRequest();

  formdata.append('uploaded_file', file);
  request.open('post', url);
  request.timeout = 45000;

  return new Promise((resolve, reject) => {
    cbProgress(0);

    request.upload.addEventListener('progress', function(e) {
      if (e.lengthComputable) {
        cbProgress(e.loaded / e.total);
      }
    });

    request.addEventListener('load', function(e) {
      if (request.status === 201) {
        const response = JSON.parse(request.responseText);
        resolve(response.hash);
      } else {
        reject(Error('The file could not be uploaded.'));
      }
    });

    request.addEventListener('error', function(e) {
      reject(Error('The file could not be uploaded.'));
    });

    request.send(formdata);
  });
}

module.exports = uploadFile;
