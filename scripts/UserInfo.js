export default class UserInfo {
  constructor({ name, about }) {
    this._nameElement = document.querySelector(name);
    this._aboutElement = document.querySelector(about);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    if (name !== undefined) {
      this._nameElement.textContent = name;
    }
    if (about !== undefined) {
      this._aboutElement.textContent = about;
    }
  }
}
