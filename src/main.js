import SiteHeaderView from "./view/site-header.js";
import MainNavigationView from "./view/main-navigation.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardPresenter from "./presenter/board-presenter.js";
import FooterStatView from "./view/footer-stat.js";
import {generateFilms, statsCount} from "./mock/film.js";

const body = document.body;
const siteHeader = body.querySelector(`.header`);
const siteMain = body.querySelector(`.main`);
const siteFooter = body.querySelector(`.footer`);

const boardPresenter = new BoardPresenter(siteMain);

const films = generateFilms();

const siteHeaderComponent = new SiteHeaderView();
render(siteHeader, siteHeaderComponent, RenderPosition.BEFOREEND);

const MainNavigationComponent = new MainNavigationView(statsCount);
render(siteMain, MainNavigationComponent, RenderPosition.BEFOREEND);


boardPresenter.init(films);

const footerStatComponent = new FooterStatView(films);
render(siteFooter, footerStatComponent, RenderPosition.BEFOREEND);
