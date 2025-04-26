const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  document.querySelector(".edit-popup").classList.add("edit-popup__opened");
});

const editCloseButton = document.querySelector(".edit-popup__close-button");
editCloseButton.addEventListener("click", function () {
  document.querySelector(".edit-popup").classList.remove("edit-popup__opened");
});

const formElement = document.querySelector(".edit-popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const aboutInput = document.querySelector("#about").value;

  const userName = document.querySelector(".profile__name");
  const userAbout = document.querySelector(".profile__about");

  userName.textContent = nameInput;
  userAbout.textContent = aboutInput;

  document.querySelector(".edit-popup").classList.remove("edit-popup__opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function () {
  document.querySelector(".add-popup").classList.add("add-popup__opened");
});

const addCloseButton = document.querySelector(".add-popup__close-button");
addCloseButton.addEventListener("click", function () {
  document.querySelector(".add-popup").classList.remove("add-popup__opened");
});
