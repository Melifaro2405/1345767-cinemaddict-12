import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";
import CommentsModel from "../model/comments-model.js";

export default class Film {
  constructor(filmListContainer, changeData, api) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._api = api;

    this._commentsModel = new CommentsModel();

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevfilmCardComponent = this._filmCardComponent;
    const prevfilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film, this._api, this._commentsModel);

    this._filmCardComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setCloseClickHandler(this._handleCloseClick);

    if (prevfilmCardComponent === null || prevfilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmCardComponent, prevfilmCardComponent);

    if (this._filmListContainer.getElement().contains(prevfilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevfilmDetailsComponent);
    }

    remove(prevfilmCardComponent);
    remove(prevfilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _openFilmCard() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._filmDetailsComponent.showFilmDetails(comments);
        document.addEventListener(`keydown`, this._escKeyDownHandler);
      });
  }

  _closeFilmCard() {
    this._filmDetailsComponent.hideFilmDetails();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._filmDetailsComponent.hideFilmDetails();
    }
  }

  _handleOpenClick() {
    this._openFilmCard();
  }

  _handleWatchlistClick() {
    this._changeData(
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isAddToWatchList: !this._film.isAddToWatchList
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isAlreadyWatched: !this._film.isAlreadyWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isAddToFavorites: !this._film.isAddToFavorites
            }
        )
    );
  }

  _handleCloseClick(film) {
    this._changeData(
        UpdateType.MINOR,
        film
    );
    this._closeFilmCard();
  }
}
