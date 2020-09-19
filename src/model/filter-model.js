import Observer from "../utils/observer.js";
import {MenuType} from "../const.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = MenuType.ALL_MOVIES;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this.notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
