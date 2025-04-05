const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  document.querySelector(".popup").classList.add("popup__opened");
});

const closeButton = document.querySelector(".popup__close-button");
closeButton.addEventListener("click", function () {
  document.querySelector(".popup").classList.remove("popup__opened");
});

let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name").value;
  let aboutInput = document.querySelector("#about").value;

  let userName = document.querySelector(".profile__name");
  let userAbout = document.querySelector(".profile__about");

  userName.textContent = nameInput;
  userAbout.textContent = aboutInput;

  document.querySelector(".popup").classList.remove("popup__opened");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
