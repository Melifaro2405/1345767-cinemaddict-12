import {FilterType} from "../const";

export const filterUtils = {
  [FilterType.ALL_MOVIES]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isAddToWatchList),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isAlreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isAddToFavorites)
};
