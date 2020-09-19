import AbstractView from "./abstract.js";
import StatisticsView from "../view/statistic.js";

export default class SiteHeader extends AbstractView {
  constructor(films) {
    super();
    this.statisticsComponent = new StatisticsView(films);
    // this._films = films.filter((film) => film.isAddToWatchList);
  }
  getTemplate() {
    return (
      `<section class="header__profile profile"
        <p class="profile__rating">${this.statisticsComponent.getRank()}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
