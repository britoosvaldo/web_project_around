export class Card {
  #name;
  #link;
  #element;
  #handleCardClick;
  #handleDeleteClick;
  #ownerId;
  #currentUserId;
  #_id;

  constructor(
    { name, link, owner, _id, currentUserId },
    handleCardClick,
    handleDeleteClick
  ) {
    // Corrigido:
    this.#ownerId = typeof owner === "object" ? owner._id : owner;
    this.#name = name;
    this.#link = link;
    this.#_id = _id;
    this.#currentUserId = currentUserId;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClick = handleDeleteClick;
    this.#element = this.#createElement();
  }

  #createElement() {
    const card = document.createElement("div");
    card.classList.add("elements__card");

    // Comparação segura (string, trim)
    if (String(this.#ownerId).trim() === String(this.#currentUserId).trim()) {
      const deleteButton = document.createElement("img");
      deleteButton.src = "images/delete-button.png";
      deleteButton.alt = "Deletar";
      deleteButton.classList.add("elements__delete-button");
      deleteButton.addEventListener("click", () => {
        this.#handleDeleteClick(this);
      });
      card.appendChild(deleteButton);
    }

    const image = document.createElement("img");
    image.classList.add("elements__image");
    image.src = this.#link;
    image.alt = this.#name;
    image.addEventListener("click", () => {
      if (typeof this.#handleCardClick === "function") {
        this.#handleCardClick(this.#name, this.#link);
      }
    });

    const description = document.createElement("div");
    description.classList.add("elements__description");

    const title = document.createElement("h2");
    title.classList.add("elements__text");
    title.textContent = this.#name;

    const likeButton = document.createElement("img");
    likeButton.classList.add("elements__like-button");
    likeButton.src = "images/like-button.png";
    likeButton.alt = "Curtir";
    likeButton.addEventListener("click", (evt) => this.#handleLike(evt));

    description.appendChild(title);
    description.appendChild(likeButton);

    card.appendChild(image);
    card.appendChild(description);

    this.#element = card;
    return card;
  }

  #handleLike(evt) {
    const likeBtn = evt.currentTarget;
    const isAlreadyLiked = likeBtn.src.endsWith("liked-button.png");
    likeBtn.src = isAlreadyLiked
      ? "images/like-button.png"
      : "images/liked-button.png";
  }

  getCardElement() {
    return this.#element;
  }

  removeCard() {
    this.#element.remove();
  }

  getId() {
    return this.#_id;
  }
}
