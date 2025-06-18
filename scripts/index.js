import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";
import { Section } from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const imagePopup = new PopupWithImage(
  ".image-popup",
  ".image-popup__image",
  ".image-popup__place"
);
imagePopup.setEventListeners();

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

function createCard(cardData) {
  return new Card(cardData, (name, link) => {
    imagePopup.open({ name, link });
  }).getCardElement();
}

const cardsSection = new Section(
  { items: initialCards, renderer: (cardData) => createCard(cardData) },
  ".elements"
);

cardsSection.renderItems();

const editForm = document.querySelector(".edit-popup__form");
const editFormValidator = new FormValidator(
  {
    inputSelector: "input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button--disabled",
  },
  editForm
);
editFormValidator.enableValidation();

const addForm = document.querySelector(".add-popup__form");
const addFormValidator = new FormValidator(
  {
    inputSelector: "input",
    submitButtonSelector: "#create",
    inactiveButtonClass: "popup__save-button--disabled",
  },
  addForm
);
addFormValidator.enableValidation();

function handleEditFormSubmit(data) {
  document.querySelector(".profile__name").textContent = data.name;
  document.querySelector(".profile__about").textContent = data.about;
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm(".edit-popup", handleEditFormSubmit);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(".add-popup", (data) => {
  const name = data["name-title"];
  const link = data.link;

  if (name && link) {
    const cards = document.querySelectorAll(".elements__card");
    if (cards.length >= 6) {
      cards[cards.length - 1].remove();
    }
    const newCardEl = createCard({ name, link });
    cardsSection.addItem(newCardEl);
  }
  addCardPopup.close();
});
addCardPopup.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    editFormValidator.resetValidation();
    editProfilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});
