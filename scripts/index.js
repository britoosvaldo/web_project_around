import "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";

const editPopup = new Popup(".edit-popup");
editPopup.setEventListeners();
editPopup.open();

const validationConfig = {
  inputSelector: "input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button--disabled",
};

const editForm = document.querySelector(".edit-popup__form");
new FormValidator(validationConfig, editForm).enableValidation();

const addForm = document.querySelector(".add-popup__form");
const addFormConfig = {
  inputSelector: "input",
  submitButtonSelector: "#create",
  inactiveButtonClass: "popup__save-button--disabled",
};
new FormValidator(addFormConfig, addForm).enableValidation();

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData);
      return card.getCardElement();
    },
  },
  ".elements"
);

cardsSection.renderItems();

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = document.getElementById("name-title").value.trim();
  const link = document.getElementById("link").value.trim();

  const elems = document.querySelector(".elements");
  if (elems.children.length >= 6) {
    elems.lastElementChild.remove();
  }

  const newCardEl = cardsSection._renderer({ name, link });
  cardsSection.addItem(newCardEl);

  document.querySelector(".add-popup").classList.remove("add-popup__opened");
  document.removeEventListener("keydown", handleAddPopupEscClose);

  document.getElementById("name-title").value = "";
  document.getElementById("link").value = "";
});
