export class Section {
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

  addItem(element) {
    this._container.prepend(element);
  }
}
