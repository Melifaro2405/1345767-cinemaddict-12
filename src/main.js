import SiteHeaderView from "./view/site-header.js";
import FilmsFilterView from "./view/films-filter.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/board-presenter.js";
import FilmsModel from "./model/films-model.js";
import FilterModel from "./model/filter-model.js";
import FooterStatView from "./view/footer-stat.js";
import {generateFilms} from "./mock/film.js";

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const films = generateFilms();

const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderComponent = new SiteHeaderView();
render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);

const filmsFilterComponent = new FilmsFilterView(filmsModel, filterModel);
render(siteMain, filmsFilterComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMain, filmsModel, filterModel);

boardPresenter.init();

const footerStatComponent = new FooterStatView(films);
render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
