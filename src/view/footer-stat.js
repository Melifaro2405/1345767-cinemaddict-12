import {createElement} from "../util.js";

export default class FooterStat {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<p>130 291 movies inside</p>`
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
