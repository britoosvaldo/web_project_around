import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";
import { Section } from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import api from "./api.js";

// --- Função de feedback de loading nos botões ---
function setButtonLoading(button, isLoading, textDefault, textLoading) {
  if (isLoading) {
    button.textContent = textLoading;
    button.disabled = true;
  } else {
    button.textContent = textDefault;
    button.disabled = false;
  }
}

const imagePopup = new PopupWithImage(
  ".image-popup",
  ".image-popup__image",
  ".image-popup__place"
);
imagePopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation(".confirm-popup");
confirmPopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open({ name, link });
}

let currentUserId = null;

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
  // avatar: ".profile__photo" // Só se sua classe UserInfo usar!
});

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      owner: cardData.owner,
      _id: cardData._id,
      currentUserId: currentUserId,
    },
    handleCardClick,
    (cardInstance) => {
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        if (cardInstance.getId()) {
          api
            .deleteCard(cardInstance.getId())
            .then(() => {
              cardInstance.removeCard();
              confirmPopup.close();
            })
            .catch((err) => {
              console.log(err);
              confirmPopup.close();
            });
        } else {
          cardInstance.removeCard();
          confirmPopup.close();
        }
      });
    }
  );
  return card.getCardElement();
}

// --- EDITAR PERFIL ---
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

function handleEditFormSubmit(data) {
  const button = document.querySelector(
    ".edit-popup__form .popup__save-button"
  );
  setButtonLoading(button, true, "Salvar", "Salvando...");
  api
    .editUserInfo(data.name, data.about)
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => setButtonLoading(button, false, "Salvar", "Salvando..."));
}

const editProfilePopup = new PopupWithForm(".edit-popup", handleEditFormSubmit);
editProfilePopup.setEventListeners();

// --- ADICIONAR CARD ---
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

const addCardPopup = new PopupWithForm(".add-popup", (data) => {
  const button = document.querySelector(
    ".add-popup__form .popup__create-button"
  );
  setButtonLoading(button, true, "Criar", "Criando...");
  const name = data["name-title"];
  const link = data.link;

  if (name && link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        const newCardEl = createCard(newCard);
        cardsSection.addItem(newCardEl);
        addCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonLoading(button, false, "Criar", "Criando..."));
  } else {
    setButtonLoading(button, false, "Criar", "Criando...");
  }
});
addCardPopup.setEventListeners();

// --- AVATAR/EDITAR FOTO ---
const avatarForm = document.querySelector(".avatar-popup__form");
const avatarFormValidator = new FormValidator(
  {
    inputSelector: "input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button--disabled",
  },
  avatarForm
);
avatarFormValidator.enableValidation();

const avatarPopup = new PopupWithForm(".avatar-popup", (data) => {
  const button = document.querySelector(
    ".avatar-popup__form .popup__save-button"
  );
  setButtonLoading(button, true, "Salvar", "Salvando...");
  const avatarUrl = data["avatar-link"];
  if (avatarUrl) {
    api
      .profilePhotoUpdate(avatarUrl)
      .then((res) => {
        document.querySelector(".profile__photo").src = res.avatar;
        avatarPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setButtonLoading(button, false, "Salvar", "Salvando..."));
  } else {
    setButtonLoading(button, false, "Salvar", "Salvando...");
  }
});
avatarPopup.setEventListeners();

document
  .querySelector(".profile__photo-edit-btn")
  .addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
  });

// Só renderiza os cards depois de saber o id do usuário logado!
let cardsSection;

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo(user);
    // --- ATUALIZA O AVATAR NO DOM! ---
    document.querySelector(".profile__photo").src = user.avatar;
    currentUserId = user._id;

    api
      .getInitialCards()
      .then((cards) => {
        cardsSection = new Section(
          {
            items: cards,
            renderer: (cardData) => cardsSection.addItem(createCard(cardData)),
          },
          ".elements"
        );
        cardsSection.renderItems();
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));

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
