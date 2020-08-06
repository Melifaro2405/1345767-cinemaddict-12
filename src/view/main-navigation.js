import {random} from "lodash";

export const createMainNavigationTemplate = () => {

  const randomWatchList = random(0, 50);
  const randomrHistory = random(0, 50);
  const randomFavorites = random(0, 50);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${randomWatchList}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${randomrHistory}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${randomFavorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
