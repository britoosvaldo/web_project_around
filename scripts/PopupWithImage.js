import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(imageSelector);
    this._captionElement = this._popup.querySelector(captionSelector);
  }

  /**
   * Abre o popup de imagem com a imagem e legenda fornecidas.
   * @param {string} imageSrc - URL da imagem a ser exibida.
   * @param {string} imageAlt - Texto alternativo e legenda da imagem.
   */
  open(imageSrc, imageAlt) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageAlt;
    this._captionElement.textContent = imageAlt;
    super.open();
  }
}
