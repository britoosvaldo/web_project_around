const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  document.querySelector(".popup").classList.add("popup__opened");
});

const closeButton = document.querySelector(".popup__close-button");
closeButton.addEventListener("click", function () {
  document.querySelector(".popup").classList.remove("popup__opened");
});
