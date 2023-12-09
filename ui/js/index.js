const uploadFile = require('./utils/upload-file');
const calculateFileChecksum = require('./utils/calculate-file-checksum');
const ProgressBar = require('./components/progressbar');
const DropFile = require('./components/dropfile');
const Messages = require('./components/messages');

const form = document.querySelector('form.form-upload');
const fileInput = form.querySelector('[name="uploaded_file"]');
const uploadFileButton = form.querySelector('input[type="submit"]');

const progressBar = new ProgressBar({
  containerSelector: 'div.progress-container',
  labelSelector: '.progress-label',
  statusSelector: '.progress-status',
});

const dropFileContainer = new DropFile({
  containerSelector: 'label.drop-container',
  fileInputSelector: '#uploaded-file',
});

const message = new Messages({containerSelector: 'div.message-container'});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    prepareFileUpload();

    for (const file of fileInput.files) {
      await validateChecksumAndUploadFile(file);
    }
  } finally {
    finalizeFileUpload();
  }
});

/**
 * Calculates file checksum an upload file.
 * @param {File} file file
 */
async function validateChecksumAndUploadFile(file) {
  try {
    progressBar.setLabel('Calculate checksum');
    progressBar.resetProgress();
    const hash = await calculateFileChecksum(file, onProgress);

    progressBar.setLabel('Upload file');
    progressBar.resetProgress();
    const serverHash = await uploadFile(form.action,
        file, onProgress);

    if (hash !== serverHash) {
      message.addMessage(Messages.ERROR,
          `The file ${file.name} may be corrupt.`);
    } else {
      message.addMessage(Messages.SUCCESS,
          `The file ${file.name} has been uploaded successfully.`);
    }
  } catch (e) {
    message.addMessage(Messages.ERROR,
        `Error uploading file ${file.name}: ${e.message}`);
  }
}

/**
 * Prepare UI for file upload.
 */
function prepareFileUpload() {
  uploadFileButton.disabled = true;
  progressBar.setVisability(true);
  dropFileContainer.disable();
  message.clear();
}

/**
 * Uodate UI after file upload.
 */
function finalizeFileUpload() {
  uploadFileButton.disabled = false;
  dropFileContainer.enable();
  progressBar.setVisability(false);
}

/**
 * Progress callback
 * @param {Number} value progress value
 */
function onProgress(value) {
  progressBar.updateProgress(value);
}
