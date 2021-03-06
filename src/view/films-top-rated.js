import AbstractView from "./abstract.js";

export default class FilmsTopRated extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>

        <div class="films-list__container films-list--top-rated""></div>
      </section>`
    );
  }
}
