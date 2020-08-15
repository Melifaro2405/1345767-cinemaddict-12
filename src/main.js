import SiteHeaderView from "./view/site-header.js";
import MainNavigationView from "./view/main-navigation.js";
import FilmsSortView from "./view/films-sort.js";
import FilmsBoardView from "./view/films-board.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsTopRatedView from "./view/films-top-rated.js";
import FilmsMostCommentedView from "./view/films-most-commented.js";
import FilmCardView from "./view/film-card.js";
import FooterStatView from "./view/footer-stat.js";
import FilmDetailsView from "./view/film-details.js";
import NoDataView from "./view/no-data.js";
import {render, RenderPosition} from "./util.js";
import {generateFilms, statsCount} from "./mock/film.js";

const FILMS_COUNT_PER_STEP = 5;
const FILMS_RATED_COUNT = 2;
const FILMS_COMMENTED_COUNT = 2;

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const films = generateFilms();

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const showFilmDetails = () => {
    filmListElement.appendChild(filmDetailsComponent.getElement());
  };

  const hideFilmDetails = () => {
    filmListElement.removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      hideFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent.getElement().addEventListener(`click`, () => {
    showFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    hideFilmDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, filmsOnBoard) => {
  if (filmsOnBoard.length === 0) {
    const noDataComponent = new NoDataView();
    const noDataElement = noDataComponent.getElement();
    render(boardContainer, noDataElement, RenderPosition.BEFOREEND);
    return;
  }

  const boardComponent = new FilmsBoardView();
  const boardElement = boardComponent.getElement();
  render(boardContainer, boardElement, RenderPosition.BEFOREEND);

  const filmsListComponent = new FilmsListView();
  const filmsListElement = filmsListComponent.getElement();
  render(boardElement, filmsListElement, RenderPosition.BEFOREEND);

  const filmsListContainerComponent = new FilmsListContainerView();
  const filmsListContainerElement = filmsListContainerComponent.getElement();
  render(filmsListElement, filmsListContainerElement, RenderPosition.BEFOREEND);

  const filmsTopRatedComponent = new FilmsTopRatedView();
  const filmsTopRatedElement = filmsTopRatedComponent.getElement();
  render(boardElement, filmsTopRatedElement, RenderPosition.BEFOREEND);

  const filmsMostCommentedComponent = new FilmsMostCommentedView();
  const filmsMostCommentedElement = filmsMostCommentedComponent.getElement();
  render(boardElement, filmsMostCommentedElement, RenderPosition.BEFOREEND);

  filmsOnBoard
    .slice(0, Math.min(filmsOnBoard.length, FILMS_COUNT_PER_STEP))
    .forEach((film) => {
      renderFilm(filmsListContainerElement, film);
    });

  if (filmsOnBoard.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    const showMoreButtonElement = showMoreButtonComponent.getElement();
    render(filmsListElement, showMoreButtonElement, RenderPosition.BEFOREEND);

    showMoreButtonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filmsOnBoard
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= filmsOnBoard.length) {
        showMoreButtonElement.remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  films
    .sort((a, b) => b.raiting - a.raiting)
    .slice(0, FILMS_RATED_COUNT)
    .forEach((film) => {
      const filmsListTopRatedDiv = siteMain.querySelector(`.films-list--top-rated`);
      const filmsListTopRatedComponent = new FilmCardView(film);
      const filmsListTopRatedElement = filmsListTopRatedComponent.getElement();
      render(filmsListTopRatedDiv, filmsListTopRatedElement, RenderPosition.BEFOREEND);
    });

  films
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, FILMS_COMMENTED_COUNT)
    .forEach((film) => {
      const filmsListMostCommentedDiv = siteMain.querySelector(`.films-list--most-commented`);
      const filmsListMostCommentedComponent = new FilmCardView(film);
      const filmsListMostCommentedElement = filmsListMostCommentedComponent.getElement();
      render(filmsListMostCommentedDiv, filmsListMostCommentedElement, RenderPosition.BEFOREEND);
    });
};

const siteHeaderComponent = new SiteHeaderView();
const siteHeaderElement = siteHeaderComponent.getElement();
render(siteHeader, siteHeaderElement, RenderPosition.BEFOREEND);

const MainNavigationComponent = new MainNavigationView(statsCount);
const MainNavigationElement = MainNavigationComponent.getElement();
render(siteMain, MainNavigationElement, RenderPosition.BEFOREEND);

const FilmsSortComponent = new FilmsSortView();
const FilmsSortElement = FilmsSortComponent.getElement();
render(siteMain, FilmsSortElement, RenderPosition.BEFOREEND);

renderBoard(siteMain, films);

const footerStatComponent = new FooterStatView(films);
const footerStatElement = footerStatComponent.getElement();
render(siteFooter, footerStatElement, RenderPosition.BEFOREEND);
