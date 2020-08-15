import {createElement} from "../util.js";

export default class MainNavigation {
  constructor({watchListCount, historyCount, favoritesCount}) {
    this._element = null;
    this._watchListCount = watchListCount;
    this._historyCount = historyCount;
    this._favoritesCount = favoritesCount;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._watchListCount}</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._historyCount}</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favoritesCount}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
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
