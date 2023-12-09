/**
 * @class ProgressBar
 */
class ProgressBar {
  /**
   * @constructor
   * @param {Object} options
   * @param {String} options.containerSelector
   * @param {String} options.labelSelector
   * @param {String} options.statusSelector
   */
  constructor({containerSelector, labelSelector, statusSelector}) {
    this.container = document.querySelector(containerSelector);
    this.progress = this.container.querySelector('progress');
    this.label = this.container.querySelector(labelSelector);
    this.status = this.container.querySelector(statusSelector);
  }

  /**
   * Sets progress bar lable
   * @param {String} text
   */
  setLabel(text) {
    this.label.innerText = text;
  }

  /**
   * Resets progress bar
   */
  resetProgress() {
    this.status.innerText = '';
    this.progress.value = 0;
  }

  /**
   * Updates progress bar value
   * @param {Number} value
   */
  updateProgress(value) {
    const percent = Math.round(value * 100);

    this.progress.value = percent;
    this.status.innerText = `${percent.toFixed()}%`;
  }

  /**
   * Setscontainer visability
   * @param {Boolean} flag
   */
  setVisability(flag) {
    if (flag) {
      this.container.classList.remove('hidden');
    } else {
      this.container.classList.add('hidden');
    }
  }
}

module.exports = ProgressBar;
