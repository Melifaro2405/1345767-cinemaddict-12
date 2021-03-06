import AbstractView from "./abstract.js";

export default class FilmsList extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>`
    );
  }
}
