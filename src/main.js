
import {createSiteHeaderTemplate} from "./view/site-header.js";
import {createMainNavigationTemplate} from "./view/main-navigation.js";
import {createFilmsSortTemplate} from "./view/films-sort.js";
import {createFilmsBoardTemplate} from "./view/films-board.js";
import {createAllFilmsTemplate} from "./view/all-films.js";
import {createFilmsTopRatedTemplate} from "./view/films-top-rated.js";
import {createFilmsMostCommentedTemplate} from "./view/films-most-commented.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFooterStatTemplate} from "./view/footer-stat.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";

import {render} from "./util.js";


const FILMS_COUNT = 5;
const FILMS_RATED_COUNT = 2;
const FILMS_COMMENTED_COUNT = 2;


const body = document.body;
const siteHeaderElement = body.querySelector(`.header`);

render(siteHeaderElement, createSiteHeaderTemplate(), `beforeend`);

const siteMainElement = body.querySelector(`.main`);

render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createFilmsSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);

render(boardElement, createAllFilmsTemplate(), `afterbegin`);
render(boardElement, createFilmsTopRatedTemplate(), `beforeend`);
render(boardElement, createFilmsMostCommentedTemplate(), `beforeend`);

const filmsListElement = boardElement.querySelector(`.films-list__container`);
const filmsRatedElement = boardElement.querySelector(`.films-list--top-rated`);
const filmsCommentedElement = boardElement.querySelector(`.films-list--most-commented`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < FILMS_RATED_COUNT; i++) {
  render(filmsRatedElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < FILMS_COMMENTED_COUNT; i++) {
  render(filmsCommentedElement, createFilmCardTemplate(), `beforeend`);
}

const siteFooterElement = body.querySelector(`.footer`);
const footerStatElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatElement, createFooterStatTemplate(), `beforeend`);
render(body, createFilmDetailsTemplate(), `beforeend`);
