import {MenuType} from "../const.js";
import {MenuItem} from "../const.js";
import {filterUtils} from "../utils/filter-films.js";
import Smart from "./abstract-smart.js";
import {UpdateType} from "../const.js";

export default class FilmsFilter extends Smart {
  constructor(filmsModel, filterModel) {
    super();
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._currentMenuType = MenuType.ALL_MOVIES;
    this._statType = false;
    this._countFilms();
    this._filmsModel.addObserver(this._onDataChange.bind(this));
    this._onFilterClickHandler = this._onFilterClick.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);

    this.setHandlers();
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${this._currentMenuType === MenuType.ALL_MOVIES ? `main-navigation__item--active` : ``}" data-filter-type="${MenuType.ALL_MOVIES}">All movies</a>
          <a href="#watchlist" class="main-navigation__item ${this._currentMenuType === MenuType.WATCHLIST ? `main-navigation__item--active` : ``}" data-filter-type="${MenuType.WATCHLIST}" data-menu-type="${MenuItem.FILMS}">Watchlist <span class="main-navigation__item-count">${this._watchListCount}</span></a>
          <a href="#history" class="main-navigation__item ${this._currentMenuType === MenuType.HISTORY ? `main-navigation__item--active` : ``}" data-filter-type="${MenuType.HISTORY}" data-menu-type="${MenuItem.FILMS}">History <span class="main-navigation__item-count">${this._historyCount}</span></a>
          <a href="#favorites" class="main-navigation__item ${this._currentMenuType === MenuType.FAVORITES ? `main-navigation__item--active` : ``}" data-filter-type="${MenuType.FAVORITES}" data-menu-type="${MenuItem.FILMS}">Favorites <span class="main-navigation__item-count">${this._favoritesCount}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional ${this._statType ? `main-navigation__item--active` : ``}" data-menu-type="${MenuItem.STATS}">Stats</a>
      </nav>`
    );
  }

  _onFilterClick(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._statType = false;
    const currentMenuType = evt.target.dataset.filterType;

    this._filterModel.setFilter(UpdateType.MINOR, currentMenuType);
    this._currentMenuType = currentMenuType;
    this.updateElement();
    this._callback.filterClick();
  }

  _countFilms() {
    const films = this._filmsModel.getFilms();

    this._watchListCount = filterUtils[MenuType.WATCHLIST](films).length;
    this._historyCount = filterUtils[MenuType.HISTORY](films).length;
    this._favoritesCount = filterUtils[MenuType.FAVORITES](films).length;
  }

  _onDataChange() {
    this._countFilms();
    this.updateElement();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._statType = true;
    this._currentMenuType = false;
    this._callback.menuClick(evt.target.dataset.menuType);
    this.updateElement();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._menuClickHandler);
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._onFilterClickHandler);
  }

  setHandlers() {
    this.setFilterClickHandler(this._callback.filterClick);
    this.setMenuClickHandler(this._callback.menuClick);
  }
}
