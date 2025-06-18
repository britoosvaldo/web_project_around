export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _checkInputValidity(inputElement) {
    const errorSpan = document.getElementById(`${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      errorSpan.textContent = inputElement.validationMessage;
    } else {
      errorSpan.textContent = "";
    }
  }

  _toggleButtonState() {
    const formIsValid = this._inputList.every(
      (inputEl) => inputEl.validity.valid
    );
    if (formIsValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      if (!this._formElement.checkValidity()) {
        evt.preventDefault();
      }
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorSpan = document.getElementById(`${inputElement.id}-error`);
      errorSpan.textContent = "";
    });
    this._toggleButtonState();
  }
}
