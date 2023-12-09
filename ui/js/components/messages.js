

/**
 * @class Messages
 */
class Messages {
  /**
   * Returns ERROR type message constant
   * @return {Number}
   */
  static get ERROR() {
    return 1;
  }

  /**
   * Returns SUCCESS type message constant
   * @return {Number}
   */
  static get SUCCESS() {
    return 0;
  }

  /**
   * @constructor
   * @param {Object} options
   * @param {String} options.containerSelector
   */
  constructor({containerSelector}) {
    this.container = document.querySelector(containerSelector);
    this.messageList = this.container.querySelector('ul');
  }

  /**
   * Adds message to the container
   * @param {Number} type
   * @param {String} text
   */
  addMessage(type, text) {
    let cssClass = '';

    switch (type) {
      case Messages.ERROR:
        cssClass = 'error';
        break;
      case Messages.SUCCESS:
        cssClass = 'success';
        break;
    }

    const listItem = document.createElement('li');
    listItem.classList.add(cssClass);
    listItem.textContent = text;

    this.messageList.appendChild(listItem);
  }

  /**
   * Clears the message container
   */
  clear() {
    this.messageList.replaceChildren();
  }
}

module.exports = Messages;
