import SmartView from "./abstract-smart.js";

export default class FilmDetails extends SmartView {
  constructor(film) {
    super();

    this._isAdult = film.isAdult;
    this._film = film;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._openClickHandler = this._openClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this.setHandlers();
  }

  _createComment(comment) {
    return (
      `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.autor}</span>
              <span class="film-details__comment-day">${comment.time}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
    );
  }

  getTemplate() {
    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${this._film.poster}" alt="">

                <p class="film-details__age">${this._isAdult ? `18+` : ``}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._film.title}</h3>
                    <p class="film-details__title-original">Original: ${this._film.title}</p>
                  </div>

                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._film.raiting}</p>
                  </div>
                </div>

                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${this._film.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${this._film.writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${this._film.actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${this._film.releaseDate}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${this._film.runtime}m</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._film.country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${this._film.genres[0]}</span>
                      <span class="film-details__genre">${this._film.genres[1]}</span>
                      <span class="film-details__genre">${this._film.genres[2]}</span></td>
                  </tr>
                </table>

                <p class="film-details__film-description">${this._film.description}</p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._film.isAddToWatchList ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._film.isAlreadyWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._film.isAddToFavorites ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>

          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._film.comments.length}</span></h3>

              <ul class="film-details__comments-list">
                ${this._film.comments.map(this._createComment).join(``)}
              </ul>

              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
    </section>`
    );
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(this._film);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  _showPopup(child) {
    if (child instanceof SmartView) {
      child = child.getElement();
    }
    document.body.appendChild(child);
    document.body.classList.add(`hide-overflow`);
  }

  _closePopup(child) {
    if (child instanceof SmartView) {
      child = child.getElement();
    }
    // document.body.(child);
    child.remove();
    document.body.classList.remove(`hide-overflow`);
  }

  showFilmDetails() {
    this._showPopup(this);
  }

  hideFilmDetails() {
    this._closePopup(this);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  _watchlistClickHandler() {
    this.updateData({
      isAddToWatchList: !this._film.isAddToWatchList
    });
  }

  _watchedClickHandler() {
    this.updateData({
      isAlreadyWatched: !this._film.isAlreadyWatched
    });
  }

  _favoriteClickHandler() {
    this.updateData({
      isAddToFavorites: !this._film.isAddToFavorites
    });
  }

  setHandlers() {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._watchlistClickHandler);
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._watchedClickHandler);
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._favoriteClickHandler);
    this.setCloseClickHandler(this._callback.closeClick);
  }
}
