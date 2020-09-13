import SiteHeaderView from "./view/site-header.js";
import FilmsFilterStatView from "./view/films-filter-stat.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/board-presenter.js";
import FilmsModel from "./model/films-model.js";
import FilterModel from "./model/filter-model.js";
import FooterStatView from "./view/footer-stat.js";
import {generateFilms} from "./mock/film.js";
import {MenuItem} from "./const.js";

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();

const films = generateFilms();
filmsModel.setFilms(films);

const siteHeaderComponent = new SiteHeaderView();
const filmsFilterStatComponent = new FilmsFilterStatView(filmsModel, filterModel);
const boardPresenter = new BoardPresenter(siteMain, filmsModel, filterModel);
const footerStatComponent = new FooterStatView(films);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      boardPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      boardPresenter.destroy();
      // Показать статистику
      break;
  }
};

filmsFilterStatComponent.setMenuClickHandler(handleSiteMenuClick);

render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);
render(siteMain, filmsFilterStatComponent, RenderPosition.BEFOREEND);

boardPresenter.init();

render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
