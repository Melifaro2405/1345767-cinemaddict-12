import {createElement} from "../util.js";

export default class FooterStat {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return (
      `<p>${ this._films.length} movies inside</p>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
