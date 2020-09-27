import FilmsBoardView from "../view/films-board.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoDataView from "../view/no-data.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsSortView from "../view/films-sort.js";
import LoadingView from "../view/loading.js";
import FilmPresenter from "./film.js";
import {SortType} from "../const.js";
import {filterUtils} from "../utils/filter-films.js";
import {sortFilmDate, sortFilmRating} from "../utils/sort-films.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILMS_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer, filmsModel, filterModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._isLoading = true;
    this._api = api;

    this._sortComponent = new FilmsSortView();
    this._boardComponent = new FilmsBoardView();
    this._listComponent = new FilmsListView();
    this._listContainerComponent = new FilmsListContainerView();
    this._noDataComponent = new NoDataView();
    this._loadingComponent = new LoadingView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._loadingCompleted();
    this._renderSort();

    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderListContainer();
    this._renderList();
    this._renderBoard();

    this._filmsModel.addObserver(this._handleFilmChange);
    this._filterModel.addObserver(this._onFilterTypeChange);
  }

  destroy() {
    this._clearBoard();

    remove(this._listContainerComponent);
    remove(this._listComponent);
    remove(this._boardComponent);
    remove(this._sortComponent);
    remove(this._loadingComponent);

    this._filmsModel.removeObserver(this._handleFilmChange);
    this._filterModel.removeObserver(this._onFilterTypeChange);
  }

  _getFilms() {
    const films = this._filmsModel.getFilms();
    const filterAddFilms = filterUtils[this._filterModel.getFilter()](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filterAddFilms.slice().sort(sortFilmDate);
      case SortType.RATING:
        return filterAddFilms.slice().sort(sortFilmRating);
    }
    return filterAddFilms;
  }

  _onFilterTypeChange() {
    this._clearBoard();
    this._renderFilmList();
  }

  _handleFilmChange(updateType, updatedFilm) {
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderFilmList();
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._noDataComponent);
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);
  }

  _renderList() {
    render(this._boardComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderListContainer() {
    render(this._listComponent, this._listContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._listContainerComponent, this._onFilmUpdate.bind(this), this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _onFilmUpdate(updateType, film) {
    this._api.updateFilm(film)
    .then((data) => {
      this._filmsModel.updateFilm(updateType, data);
    });
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._boardComponent, this._noDataComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
    render(this._listComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmList() {
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    const filmCount = this._getFilms().length;
    const films = filterUtils[this._filterModel.getFilter()](this._getFilms()).slice(0, Math.min(filmCount, this._renderedFilmCount));

    this._renderFilms(films);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _loadingCompleted() {
    this._isLoading = false;
    remove(this._loadingComponent);
  }

  _renderBoard() {
    if (this._isLoading) {
      this.renderLoading();
      return;
    }
    const filmCount = this._getFilms().length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmList();
  }
}
