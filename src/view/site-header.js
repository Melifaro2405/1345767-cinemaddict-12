import Smart from "./smart.js";
import StatisticsView from "../view/statistic.js";
import FilmsModel from "../model/films.js";

export default class SiteHeader extends Smart {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this.statisticsComponent = new StatisticsView(filmsModel.getFilms());
    filmsModel.addObserver(() => {
      this.updateElement();
    });

  }

  setHandlers() {}

  getTemplate() {
    const watchedFilms = this._filmsModel.getFilms().filter((film) => film.isAlreadyWatched).length;
    return (
      `<section class="header__profile profile"
        <p class="profile__rating">${FilmsModel.getRank(watchedFilms)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
