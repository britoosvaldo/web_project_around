import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }

  setSubmitAction(action) {
    this._handleConfirm = action;
  }
}
