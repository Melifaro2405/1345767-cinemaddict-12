import {createElement} from "../util.js";

export default class FilmCard {
  constructor({isAddToWatchList, isAlreadyWatched, isAddToFavorites, film}) {
    this._element = null;
    this._isAddToWatchListt = isAddToWatchList;
    this._isAlreadyWatched = isAlreadyWatched;
    this._isAddToFavorites = isAddToFavorites;
    this._film = film;
  }

  getTemplate() {
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._film.title}</h3>
        <p class="film-card__rating">${this._film.raiting}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._film.releaseDate}</span>
          <span class="film-card__duration">${this._film.runtime}m</span>
          <span class="film-card__genre">${this._film.genres[0]}</span>
        </p>
        <img src="${this._film.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._film.description}</p>
        <a class="film-card__comments">${this._film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isAddToWatchList ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isAlreadyWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isAddToFavorites ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
        </form>
      </article>`
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
