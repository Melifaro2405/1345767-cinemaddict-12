import {createElement} from "../util.js";

export default class FilmsTopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container films-list--top-rated""></div>
      </section>`
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
