import FilmsSortView from "./view/films-sort.js";
import {SortType} from "../const.js";
import {sortFilmDate, sortFilmRating} from "../utils/sort-films.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Sort {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;
    this._sortComponent = new FilmsSortView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    render(this._mainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._renderSort();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardTasks.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._boardTasks.sort(sortFilmRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._mainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearFilmList() {
    this._filmListComponent.getElement().innerHTML = ``;
    // this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }
}
