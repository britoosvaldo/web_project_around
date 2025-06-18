export class Card {
  #name;
  #link;
  #element;
  #handleImageClick;

  constructor({ name, link }, handleImageClick) {
    this.#name = name;
    this.#link = link;
    this.#handleImageClick = handleImageClick;
    this.#element = this.#createElement();
  }

  #createElement() {
    const card = document.createElement("div");
    card.classList.add("elements__card");

    const deleteButton = document.createElement("img");
    deleteButton.src = "images/delete-button.png";
    deleteButton.alt = "Deletar";
    deleteButton.classList.add("elements__delete-button");
    deleteButton.addEventListener("click", () => this.#handleDelete());

    const image = document.createElement("img");
    image.classList.add("elements__image");
    image.src = this.#link;
    image.alt = this.#name;
    image.addEventListener("click", () => {
      if (typeof this.#handleImageClick === "function") {
        this.#handleImageClick(this.#name, this.#link);
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

    card.appendChild(deleteButton);
    card.appendChild(image);
    card.appendChild(description);

    return card;
  }

  #handleDelete() {
    this.#element.remove();
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
}
