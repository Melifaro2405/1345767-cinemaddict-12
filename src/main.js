import SiteHeaderView from "./view/site-header.js";
import MainNavigationView from "./view/main-navigation.js";
import FilmsSortView from "./view/films-sort.js";
import FilmsBoardView from "./view/films-board.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import ShowMoreButtonView from "./view/films-list-container.js";
import FilmsTopRatedView from "./view/films-top-rated.js";
import FilmsMostCommentedView from "./view/films-most-commented.js";
import FilmCardView from "./view/film-card.js";
import FooterStatView from "./view/footer-stat.js";
import { createFilmDetailsTemplate } from "./view/film-details.js";
import { renderElement, RenderPosition } from "./util.js";

import { generateFilms, statsCount } from "./mock/film.js";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_RATED_COUNT = 2;
const FILMS_COMMENTED_COUNT = 2;


const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const siteHeaderComponent = new SiteHeaderView();
const siteHeaderElement = siteHeaderComponent.getElement();
renderElement(siteHeader, siteHeaderElement, RenderPosition.BEFOREEND);

const MainNavigationComponent = new MainNavigationView(statsCount);
const MainNavigationElement = MainNavigationComponent.getElement();
renderElement(siteMain, MainNavigationElement, RenderPosition.BEFOREEND);

const FilmsSortComponent = new FilmsSortView();
const FilmsSortElement = FilmsSortComponent.getElement();
renderElement(siteMain, FilmsSortElement, RenderPosition.BEFOREEND);

const boardComponent = new FilmsBoardView();
const boardElement = boardComponent.getElement();
renderElement(siteMain, boardElement, RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
const filmsListElement = filmsListComponent.getElement();
renderElement(boardElement, filmsListElement, RenderPosition.BEFOREEND);

const filmsListContainerComponent = new FilmsListContainerView();
const filmsListContainerElement = filmsListContainerComponent.getElement();
// renderElement(filmsListElement, filmsListContainerElement, RenderPosition.BEFOREEND);

const showMoreButtonComponent = new ShowMoreButtonView();
const showMoreButtonElement = showMoreButtonComponent.getElement();
renderElement(filmsListElement, showMoreButtonElement, RenderPosition.BEFOREEND);

renderElement(boardElement, new FilmsTopRatedView().getElement(), RenderPosition.BEFOREEND);
renderElement(boardElement, new FilmsMostCommentedView().getElement(), RenderPosition.BEFOREEND);

const films = generateFilms();

// films.slice(0, Math.min(films.length, FILMS_COUNT_PER_STEP)).forEach((film) => {
//   const filmCardComponent = new FilmCardView(film);
//   const filmCardElement = filmCardComponent.getElement();
//   renderElement(filmsListContainerElement, filmCardElement, RenderPosition.BEFOREEND);
// });

// if (films.length > FILMS_COUNT_PER_STEP) {
//   let renderedFilmsCount = FILMS_COUNT_PER_STEP;

//   const showMoreButton = document.querySelector(`.films-list__show-more`);

// showMoreButton.addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   films
//     .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
//     .forEach((item) => renderTemplate(filmsListElement, createFilmCardTemplate(item), `beforeend`));

//   renderedFilmsCount += FILMS_COUNT_PER_STEP;

//   if (renderedFilmsCount >= films.length) {
//     showMoreButton.remove();
//   }
// });
// }

// films
//   .sort((a, b) => b.raiting - a.raiting)
//   .slice(0, FILMS_RATED_COUNT)
//   .forEach((item) => {
//     renderTemplate(filmsRatedElement, createFilmCardTemplate(item), `beforeend`);
//   });

// films
//   .sort((a, b) => b.comments.length - a.comments.length)
//   .slice(0, FILMS_COMMENTED_COUNT)
//   .forEach((item) => {
//     renderTemplate(filmsCommentedElement, createFilmCardTemplate(item), `beforeend`);
//   });

// const footerStatElement = siteFooterElement.querySelector(`.footer__statistics`);

const footerStatComponent = new FooterStatView();
const footerStatElement = footerStatComponent.getElement();
renderElement(siteFooter, footerStatElement, RenderPosition.BEFOREEND);

// renderTemplate(body, createFilmDetailsTemplate(films[0]), `beforeend`);
