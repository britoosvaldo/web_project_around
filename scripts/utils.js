const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".edit-popup");
const editCloseButton = document.querySelector(".edit-popup__close-button");
const editForm = document.querySelector(".edit-popup__form");

function closeEditPopup() {
  editPopup.classList.remove("edit-popup__opened");
  document.removeEventListener("keydown", handleEscCloseEdit);
}

function handleEscCloseEdit(evt) {
  if (evt.key === "Escape") {
    closeEditPopup();
  }
}

editButton.addEventListener("click", () => {
  document.getElementById("name-error").textContent = "";
  document.getElementById("about-error").textContent = "";
  editPopup.classList.add("edit-popup__opened");
  document.addEventListener("keydown", handleEscCloseEdit);
});

editCloseButton.addEventListener("click", closeEditPopup);

editPopup.addEventListener("mousedown", (evt) => {
  if (evt.target === editPopup) {
    closeEditPopup();
  }
});

editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameInput = document.querySelector("#name").value;
  const aboutInput = document.querySelector("#about").value;

  const userName = document.querySelector(".profile__name");
  const userAbout = document.querySelector(".profile__about");

  userName.textContent = nameInput;
  userAbout.textContent = aboutInput;

  closeEditPopup();
});

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".add-popup");
const addCloseButton = document.querySelector(".add-popup__close-button");
const addForm = document.querySelector(".add-popup__form");

function closeAddPopup() {
  addPopup.classList.remove("add-popup__opened");
  document.removeEventListener("keydown", handleEscCloseAdd);
}

function handleEscCloseAdd(evt) {
  if (evt.key === "Escape") {
    closeAddPopup();
  }
}

addButton.addEventListener("click", () => {
  document.getElementById("name-title-error").textContent = "";
  document.getElementById("link-error").textContent = "";
  addPopup.classList.add("add-popup__opened");
  document.addEventListener("keydown", handleEscCloseAdd);
});

addCloseButton.addEventListener("click", closeAddPopup);

addPopup.addEventListener("mousedown", (evt) => {
  if (evt.target === addPopup) {
    closeAddPopup();
  }
});

const imagePopup = document.querySelector(".image-popup");
const imageCloseButton = document.querySelector(".image-popup__close-button");

export function closeImagePopup() {
  imagePopup.classList.remove("image-popup__opened");
  document.removeEventListener("keydown", handleEscCloseImage);
  imagePopup.removeEventListener("mousedown", handleOutsideClickImage);

  const popupImage = imagePopup.querySelector(".image-popup__image");
  popupImage.src = "";
  popupImage.alt = "";
}

function handleEscCloseImage(evt) {
  if (evt.key === "Escape") {
    closeImagePopup();
  }
}

function handleOutsideClickImage(evt) {
  if (evt.target === imagePopup) {
    closeImagePopup();
  }
}

export function openImagePopup(link, name) {
  const popupImage = imagePopup.querySelector(".image-popup__image");
  const popupCaption = imagePopup.querySelector(".image-popup__place");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  imagePopup.classList.add("image-popup__opened");

  document.addEventListener("keydown", handleEscCloseImage);

  imagePopup.addEventListener("mousedown", handleOutsideClickImage);
}

imageCloseButton.addEventListener("click", closeImagePopup);
