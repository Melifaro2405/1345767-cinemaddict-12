import {render} from "./util.js";

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

import {generateFilms, statsCount} from "./mock/film.js";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_RATED_COUNT = 2;
const FILMS_COMMENTED_COUNT = 2;


const body = document.body;
const siteHeaderElement = body.querySelector(`.header`);

render(siteHeaderElement, createSiteHeaderTemplate(), `beforeend`);

const siteMainElement = body.querySelector(`.main`);

render(siteMainElement, createMainNavigationTemplate(statsCount), `beforeend`);
render(siteMainElement, createFilmsSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);

render(boardElement, createAllFilmsTemplate(), `afterbegin`);
render(boardElement, createFilmsTopRatedTemplate(), `beforeend`);
render(boardElement, createFilmsMostCommentedTemplate(), `beforeend`);

const filmsListElement = boardElement.querySelector(`.films-list__container`);
const filmsRatedElement = boardElement.querySelector(`.films-list--top-rated`);
const filmsCommentedElement = boardElement.querySelector(`.films-list--most-commented`);

const films = generateFilms();

films.slice(0, Math.min(films.length, FILMS_COUNT_PER_STEP)).forEach((film) => {
  render(filmsListElement, createFilmCardTemplate(film), `beforeend`);
});

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((item) => render(filmsListElement, createFilmCardTemplate(item), `beforeend`));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

films
  .sort((a, b) => b.raiting - a.raiting)
  .slice(0, FILMS_RATED_COUNT)
  .forEach((item) => {
    render(filmsRatedElement, createFilmCardTemplate(item), `beforeend`);
  });

films
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, FILMS_COMMENTED_COUNT)
  .forEach((item) => {
    render(filmsCommentedElement, createFilmCardTemplate(item), `beforeend`);
  });

const siteFooterElement = body.querySelector(`.footer`);
const footerStatElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatElement, createFooterStatTemplate(), `beforeend`);
render(body, createFilmDetailsTemplate(films[0]), `beforeend`);
