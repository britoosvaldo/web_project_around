export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // Seleciona o botão de fechar qualquer que seja seu sufixo de classe
    this._closeButton = this._popup.querySelector('[class$="__close-button"]');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Abre o popup e adiciona listener para Esc
  open() {
    this._popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Fecha o popup e remove listener de Esc
  close() {
    this._popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Fecha ao pressionar Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Configura ouvintes de evento: clique no botão e clique fora
  setEventListeners() {
    if (this._closeButton) {
      this._closeButton.addEventListener("click", () => this.close());
    }
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(imageSelector);
    this._captionElement = this._popup.querySelector(captionSelector);
  }

  // Sobrescreve open para inserir src e legenda antes de abrir
  open(imageSrc, imageAlt) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageAlt;
    this._captionElement.textContent = imageAlt;
    super.open();
  }
}
