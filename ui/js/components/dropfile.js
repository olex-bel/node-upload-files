
/**
 * @class DropFile
 */
class DropFile {
  #dragAndDropEnable;

  /**
   * @constructor
   * @param {Object} options
   * @param {String} options.containerSelector
   * @param {String} options.fileInputSelector
   */
  constructor({containerSelector, fileInputSelector}) {
    this.container = document.querySelector(containerSelector);
    this.fileInput = document.querySelector(fileInputSelector);
    this.#initEvents();
    this.#dragAndDropEnable = true;
    this.activeClass = 'active';
  }

  /**
   * Enables drag and drop
   */
  enable() {
    this.#dragAndDropEnable = true;
  }

  /**
   * Disables drag and drop
   */
  disable() {
    this.#dragAndDropEnable = false;
  }

  /**
   * Init events
   */
  #initEvents() {
    this.container.addEventListener('dragover', this.#onDragOver.bind(this));
    this.container.addEventListener('dragenter', this.#onDragEnter.bind(this));
    this.container.addEventListener('dragleave', this.#onDragLeave.bind(this));
    this.container.addEventListener('drop', this.#onDrop.bind(this));
  }

  /**
   * On dragover event handler
   * @param {Event} e event data
   */
  #onDragOver(e) {
    if (this.#dragAndDropEnable) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
  }

  /**
   * On drag enter event handler
   */
  #onDragEnter() {
    this.container.classList.add(this.activeClass);
  }

  /**
   * On drag leave event handler
   */
  #onDragLeave() {
    this.container.classList.remove(this.activeClass);
  }

  /**
   * On drop event handler
   * @param {Event} e event data
   */
  #onDrop(e) {
    e.preventDefault();
    this.container.classList.remove(this.activeClass);

    if (e.dataTransfer.files) {
      this.fileInput.files = e.dataTransfer.files;
    }
  }
}

module.exports = DropFile;
