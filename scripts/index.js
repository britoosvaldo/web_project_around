import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";
import "./utils.js";

const validationConfig = {
  inputSelector: "input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button--disabled",
};

const editForm = document.querySelector(".edit-popup__form");
const addForm = document.querySelector(".add-popup__form");

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addFormConfig = {
  inputSelector: "input",
  submitButtonSelector: "#create",
  inactiveButtonClass: "popup__save-button--disabled",
};
const addFormValidator = new FormValidator(addFormConfig, addForm);
addFormValidator.enableValidation();

const container = document.querySelector(".elements");
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

initialCards.forEach((cardData) => {
  const cardInstance = new Card(cardData);
  const cardElement = cardInstance.getCardElement();
  container.appendChild(cardElement);
});

const addFormHandler = document.querySelector(".add-popup__form");

addFormHandler.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name-title").value.trim();
  const link = document.getElementById("link").value.trim();

  if (container.children.length >= 6) {
    container.lastElementChild.remove();
  }

  const cardInstance = new Card({ name, link });
  const cardElement = cardInstance.getCardElement();
  container.prepend(cardElement);

  document.querySelector(".add-popup").classList.remove("add-popup__opened");
  document.removeEventListener("keydown", handleAddPopupEscClose);

  document.getElementById("name-title").value = "";
  document.getElementById("link").value = "";
});
