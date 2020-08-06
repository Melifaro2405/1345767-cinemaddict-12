export const createFilmCardTemplate = (film) => {

  const {isAddToWatchList, isAlreadyWatched, isAddToFavorites} = film;

  const AddtoWatchClassName = isAddToWatchList
    ? `film-card__controls-item--active`
    : ``;

  const AlreadyWatchedClassName = isAlreadyWatched
    ? `film-card__controls-item--active`
    : ``;

  const AddToFavoritesClassName = isAddToFavorites
    ? `film-card__controls-item--active`
    : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${film.title}</h3>
      <p class="film-card__rating">${film.raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.date}</span>
        <span class="film-card__duration">${film.runtime}m</span>
        <span class="film-card__genre">${film.genres[0]}</span>
      </p>
      <img src="${film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${film.description}</p>
      <a class="film-card__comments">${film.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${AddtoWatchClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${AlreadyWatchedClassName}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${AddToFavoritesClassName}">Mark as favorite</button>
      </form>
    </article>`
  );
};
