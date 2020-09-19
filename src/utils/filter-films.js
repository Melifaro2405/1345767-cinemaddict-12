import {MenuType} from "../const";

export const filterUtils = {
  [MenuType.ALL_MOVIES]: (films) => films,
  [MenuType.WATCHLIST]: (films) => films.filter((film) => film.isAddToWatchList),
  [MenuType.HISTORY]: (films) => films.filter((film) => film.isAlreadyWatched),
  [MenuType.FAVORITES]: (films) => films.filter((film) => film.isAddToFavorites)
};
