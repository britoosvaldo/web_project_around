const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".edit-popup");
const editCloseButton = document.querySelector(".edit-popup__close-button");

editButton.addEventListener("click", function () {
  editPopup.classList.add("edit-popup__opened");
  document.addEventListener("keydown", handleEscClose);

  document.getElementById("name-error").textContent = "";
  document.getElementById("about-error").textContent = "";

  toggleButtonState();
});

editCloseButton.addEventListener("click", function () {
  closeEditPopup();
});

function closeEditPopup() {
  editPopup.classList.remove("edit-popup__opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closeEditPopup();
  }
}

editPopup.addEventListener("mousedown", (evt) => {
  if (evt.target === editPopup) {
    closeEditPopup();
  }
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

  closeEditPopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

// add button

const container = document.querySelector(".elements");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".add-popup");
const addCloseButton = document.querySelector(".add-popup__close-button");

addButton.addEventListener("click", function () {
  addPopup.classList.add("add-popup__opened");
  document.addEventListener("keydown", handleAddPopupEscClose);

  document.getElementById("name-title-error").textContent = "";
  document.getElementById("link-error").textContent = "";

  toggleCreateButtonState();
});

addCloseButton.addEventListener("click", function () {
  closeAddPopup();
});

addPopup.addEventListener("mousedown", (evt) => {
  if (evt.target === addPopup) {
    closeAddPopup();
  }
});

function closeAddPopup() {
  addPopup.classList.remove("add-popup__opened");
  document.removeEventListener("keydown", handleAddPopupEscClose);
}

function handleAddPopupEscClose(evt) {
  if (evt.key === "Escape") {
    closeAddPopup();
  }
}

// cards

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

//create card

function createCard({ name, link }) {
  const card = document.createElement("div");
  card.classList.add("elements__card");

  const deleteButton = document.createElement("img");
  deleteButton.src = "images/delete-button.png";
  deleteButton.alt = "Deletar";
  deleteButton.classList.add("elements__delete-button");

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  const image = document.createElement("img");
  image.classList.add("elements__image");
  image.src = link;
  image.alt = name;

  image.addEventListener("click", () => {
    openImagePopup(link, name);
  });

  const description = document.createElement("div");
  description.classList.add("elements__description");

  const title = document.createElement("h2");
  title.classList.add("elements__text");
  title.textContent = name;

  const likeButton = document.createElement("img");
  likeButton.classList.add("elements__like-button");
  likeButton.src = "images/like-button.png";
  likeButton.alt = "Curtir";

  likeButton.addEventListener("click", () => {
    likeButton.src = likeButton.src.endsWith("liked-button.png")
      ? "images/like-button.png"
      : "images/liked-button.png";
  });

  description.appendChild(title);
  description.appendChild(likeButton);

  card.appendChild(deleteButton);
  card.appendChild(image);
  card.appendChild(description);

  return card;
}

const addForm = document.querySelector(".add-popup__form");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name-title").value.trim();
  const link = document.getElementById("link").value.trim();

  const newCard = { name, link };

  if (container.children.length >= 6) {
    container.lastElementChild.remove();
  }

  const cardElement = createCard(newCard);
  container.prepend(cardElement);

  closeAddPopup();

  document.getElementById("name-title").value = "";
  document.getElementById("link").value = "";
});

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  container.appendChild(card);
});

// img popup

function openImagePopup(link, name) {
  const popup = document.querySelector(".image-popup");
  const popupImage = popup.querySelector(".image-popup__image");
  const popupCaption = popup.querySelector(".image-popup__place");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  popup.classList.add("image-popup__opened");
}

const imageCloseButton = document.querySelector(".image-popup__close-button");

imageCloseButton.addEventListener("click", () => {
  document
    .querySelector(".image-popup")
    .classList.remove("image-popup__opened");
});
