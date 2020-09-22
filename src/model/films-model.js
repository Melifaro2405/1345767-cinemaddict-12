import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this.notify(updateType, update);
  }

  static adaptToClient(data) {
    return {
      isRank: `isRank`,
      comments: data.comments,
      id: data.id,
      title: data.film_info.title,
      alternativeTitle: data.film_info.alternative_title,
      poster: data.film_info.poster,
      director: data.film_info.director,
      description: data.film_info.description,
      raiting: data.film_info.total_rating,
      releaseDate: data.film_info.release.date,
      country: data.film_info.release.release_country,
      runtime: data.film_info.runtime,
      writers: data.film_info.writers,
      actors: data.film_info.actors,
      genres: data.film_info.genre,
      isAdult: data.film_info.age_rating,
      isAddToWatchList: data.user_details.watchlist,
      isAlreadyWatched: data.user_details.already_watched,
      isAddToFavorites: data.user_details.favorite,
      watchingDate: data.user_details.watching_date
    };
  }

  static adaptToServer(data) {
    return {
      "comments": data.comments,
      "film_info": {
        "actors": data.actors,
        "age_rating": data.isAdult,
        "alternative_title": `alternative_title`,
        "description": data.description,
        "director": data.director,
        "genre": data.genres,
        "poster": data.poster,
        "release": {
          "date": data.releaseDate,
          "release_country": data.country
        },
        "runtime": data.runtime,
        "title": data.title,
        "total_rating": data.raiting,
        "writers": data.writers,
        "id": data.id,
        "user_details": {
          "already_watched": data.isAlreadyWatched,
          "favorite": data.isAddToFavorites,
          "watching_date": `watching_date`,
          "watchlist": data.isAddToWatchList
        }
      }
    };
  }
}
