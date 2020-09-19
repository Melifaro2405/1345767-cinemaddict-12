import SiteHeaderView from "./view/site-header.js";
import FilmsFilterStatView from "./view/films-filter-stat.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import BoardPresenter from "./presenter/board-presenter.js";
import FilmsModel from "./model/films-model.js";
import FilterModel from "./model/filter-model.js";
import FooterStatView from "./view/footer-stat.js";
import StatisticsView from "./view/statistic.js";
import {generateFilms} from "./mock/film.js";

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();

const films = generateFilms();
filmsModel.setFilms(films);

const siteHeaderComponent = new SiteHeaderView(filmsModel.getFilms());
const filmsFilterStatComponent = new FilmsFilterStatView(filmsModel, filterModel);
const boardPresenter = new BoardPresenter(siteMain, filmsModel, filterModel);
const footerStatComponent = new FooterStatView(films);
let filterActive = true;
let statisticsComponent = null;

const handleSiteMenuClick = () => {
  if (filterActive) {
    return;
  }

  filterActive = true;
  boardPresenter.init();
  remove(statisticsComponent);
};

const handleStatMenuClick = () => {
  if (!filterActive) {
    return;
  }

  boardPresenter.destroy();
  statisticsComponent = new StatisticsView(filmsModel.getFilms());
  render(siteMain, statisticsComponent, RenderPosition.BEFOREEND);
  filterActive = false;
};

filmsFilterStatComponent.setMenuClickHandler(handleStatMenuClick);
filmsFilterStatComponent.setFilterClickHandler(handleSiteMenuClick);

render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);
render(siteMain, filmsFilterStatComponent, RenderPosition.BEFOREEND);

boardPresenter.init();

render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
