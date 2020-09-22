import AbstractView from "./abstract.js";

export default class SiteHeader extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getRank() {
    const count = this._films.length;

    switch (true) {
      case count > 20:
        return `Movie Buff`;
      case count > 10:
        return `Fan`;
      case count > 0:
        return `Novice`;
      default:
        return ``;
    }
  }

  getTemplate() {
    return (
      `<section class="header__profile profile"
        <p class="profile__rating">${this.getRank()}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
