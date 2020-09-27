import SiteHeaderView from "./view/site-header.js";
import FilmsFilterStatView from "./view/films-filter-stat.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {UpdateType} from "./const.js";
import BoardPresenter from "./presenter/board.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FooterStatView from "./view/footer-stat.js";
import StatisticsView from "./view/statistic.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic f978asf21Hsdg89aeg`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteMain, filmsModel, filterModel, apiWithProvider);

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

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  })
  .finally(() => {
    const filmsFilterStatComponent = new FilmsFilterStatView(filmsModel, filterModel);
    const siteHeaderComponent = new SiteHeaderView(filmsModel);
    const footerStatComponent = new FooterStatView(filmsModel.getFilms());
    render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);
    render(siteMain, filmsFilterStatComponent, RenderPosition.BEFOREEND);
    boardPresenter.renderLoading();
    render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
    boardPresenter.init();
    filmsFilterStatComponent.setFilterClickHandler(handleSiteMenuClick);
    filmsFilterStatComponent.setMenuClickHandler(handleStatMenuClick);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
