// edit button

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

// add button

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", function () {
  document.querySelector(".add-popup").classList.add("add-popup__opened");
});

const addCloseButton = document.querySelector(".add-popup__close-button");
addCloseButton.addEventListener("click", function () {
  document.querySelector(".add-popup").classList.remove("add-popup__opened");
});

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

const container = document.querySelector(".elements");

initialCards.forEach(({ name, link }) => {
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
    if (likeButton.src.endsWith("liked-button.png")) {
      likeButton.src = "./images/like-button.png";
    } else {
      likeButton.src = "./images/liked-button.png";
    }
  });

  description.appendChild(title);
  description.appendChild(likeButton);

  card.appendChild(deleteButton);
  card.appendChild(image);
  card.appendChild(description);

  container.appendChild(card);
});

const imageButton = document.querySelectorAll(".elements__image");
imageButton.forEach((img) => {
  img.addEventListener("click", function () {
    document.querySelector(".image-popup").classList.add("image-popup__opened");
  });
});

const imageCloseButton = document.querySelector(".image-popup__close-button");
imageCloseButton.addEventListener("click", function () {
  document
    .querySelector(".image-popup")
    .classList.remove("image-popup__opened");
});
