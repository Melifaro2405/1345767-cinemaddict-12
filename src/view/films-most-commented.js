import AbstractView from "./abstract.js";

export default class FilmsMostCommented extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>

        <div class="films-list__container films-list--most-commented"></div>
      </section>`
    );
  }
}
