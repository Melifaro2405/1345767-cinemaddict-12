import SiteHeaderView from "./view/site-header.js";
import FilmsFilterStatView from "./view/films-filter-stat.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {UpdateType} from "./const.js";
import BoardPresenter from "./presenter/board-presenter.js";
import FilmsModel from "./model/films-model.js";
import FilterModel from "./model/filter-model.js";
import FooterStatView from "./view/footer-stat.js";
import StatisticsView from "./view/statistic.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic f978asf21Hsdg89aeg`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteMain, filmsModel, filterModel, api);

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

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  })
  .finally(() => {
    const filmsFilterStatComponent = new FilmsFilterStatView(filmsModel, filterModel);
    const siteHeaderComponent = new SiteHeaderView(filmsModel.getFilms());
    const footerStatComponent = new FooterStatView(filmsModel.getFilms());
    render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);
    render(siteMain, filmsFilterStatComponent, RenderPosition.BEFOREEND);
    render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
    boardPresenter.init();
    filmsFilterStatComponent.setFilterClickHandler(handleSiteMenuClick);
    filmsFilterStatComponent.setMenuClickHandler(handleStatMenuClick);
  });
