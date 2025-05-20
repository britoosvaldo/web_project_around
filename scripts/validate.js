// edit-popup validation

const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const saveButton = document.querySelector(".popup__save-button");

function showInputError(input) {
  const errorSpan = document.getElementById(`${input.id}-error`);
  if (!input.validity.valid) {
    errorSpan.textContent = input.validationMessage;
  } else {
    errorSpan.textContent = "";
  }
}

function toggleButtonState() {
  if (nameInput.validity.valid && aboutInput.validity.valid) {
    saveButton.disabled = false;
    saveButton.classList.remove("popup__save-button--disabled");
  } else {
    saveButton.disabled = true;
    saveButton.classList.add("popup__save-button--disabled");
  }
}

nameInput.addEventListener("input", () => {
  showInputError(nameInput);
  toggleButtonState();
});

aboutInput.addEventListener("input", () => {
  showInputError(aboutInput);
  toggleButtonState();
});

// add-popup validation

const titleInput = document.querySelector("#name-title");
const linkInput = document.querySelector("#link");
const createButton = document.querySelector("#create");

function showAddInputError(input) {
  const errorSpan = document.getElementById(`${input.id}-error`);
  if (!input.validity.valid) {
    errorSpan.textContent = input.validationMessage;
  } else {
    errorSpan.textContent = "";
  }
}

function toggleCreateButtonState() {
  if (titleInput.validity.valid && linkInput.validity.valid) {
    createButton.disabled = false;
    createButton.classList.remove("popup__save-button--disabled");
  } else {
    createButton.disabled = true;
    createButton.classList.add("popup__save-button--disabled");
  }
}

titleInput.addEventListener("input", () => {
  showAddInputError(titleInput);
  toggleCreateButtonState();
});

linkInput.addEventListener("input", () => {
  showAddInputError(linkInput);
  toggleCreateButtonState();
});
