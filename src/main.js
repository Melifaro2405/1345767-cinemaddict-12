import SiteHeaderView from "./view/site-header.js";
import MainNavigationView from "./view/main-navigation.js";
import FilmsSortView from "./view/films-sort.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/board.js";
import FooterStatView from "./view/footer-stat.js";
import {generateFilms, statsCount} from "./mock/film.js";

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const siteHeaderComponent = new SiteHeaderView();
render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);

const MainNavigationComponent = new MainNavigationView(statsCount);
render(siteMain, MainNavigationComponent, RenderPosition.BEFOREEND);

const FilmsSortComponent = new FilmsSortView();
render(siteMain, FilmsSortComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMain);
const films = generateFilms();

boardPresenter.init(films);

const footerStatComponent = new FooterStatView(films);
render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
