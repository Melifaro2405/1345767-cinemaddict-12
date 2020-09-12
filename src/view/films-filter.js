import {FilterType} from "../const.js";
import {filterUtils} from "../utils/filter-films.js";
import Smart from "./abstract-smart.js";
import {UpdateType} from "../const.js";

export default class FilmsFilter extends Smart {
  constructor(filmsModel, filterModel) {
    super();
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._currentFilterType = FilterType.ALL_MOVIES;
    this._countFilms();
    this._filmsModel.addObserver(this._onDataChange.bind(this));
    this._onFilterClickHandler = this._onFilterClick.bind(this);

    // this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this.setHandlers();
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${this._currentFilterType === FilterType.ALL_MOVIES ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.ALL_MOVIES}">All movies</a>
          <a href="#watchlist" class="main-navigation__item ${this._currentFilterType === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${this._watchListCount}</span></a>
          <a href="#history" class="main-navigation__item ${this._currentFilterType === FilterType.HISTORY ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${this._historyCount}</span></a>
          <a href="#favorites" class="main-navigation__item ${this._currentFilterType === FilterType.FAVORITES ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${this._favoritesCount}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  _onFilterClick(evt) {
    const currentFilter = evt.target.dataset.filterType;

    this._filterModel.setFilter(UpdateType.MINOR, currentFilter);
    this._currentFilterType = currentFilter;
    this.updateElement();
  }

  _countFilms() {
    const films = this._filmsModel.getFilms();

    this._watchListCount = filterUtils[FilterType.WATCHLIST](films).length;
    this._historyCount = filterUtils[FilterType.HISTORY](films).length;
    this._favoritesCount = filterUtils[FilterType.FAVORITES](films).length;
  }

  _onDataChange() {
    this._countFilms();
    this.updateElement();
  }

  setHandlers() {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._onFilterClickHandler);
  }
}
