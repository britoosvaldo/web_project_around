export class Section {
  /**
   * @param {{ items: Array, renderer: Function }} options
   * @param {string} containerSelector
   */
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((itemData) => {
      const element = this._renderer(itemData);
      this._container.append(element);
    });
  }

  /**
   * @param {HTMLElement} element
   */

  addItem(element) {
    this._container.prepend(element);
  }
}
