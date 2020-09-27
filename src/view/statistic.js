import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import FilmsModel from "../model/films.js";
import {StatsFilters} from "../const.js";
import moment from "moment";

const MINUTES_IN_HOUR = 60;

export default class Statistic extends SmartView {
  constructor(films) {
    super();
    this._films = films.filter((film) => film.isAlreadyWatched);
    this.currentFilter = StatsFilters.ALL_TIME;
    this.createStats(this.getElement().querySelector(`.statistic__chart`));
    this.setHandlers();
  }

  setHandlers() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      this.currentFilter = evt.target.value;
      this.updateElement();
      this.createStats(this.getElement().querySelector(`.statistic__chart`));
    });
  }

  _setFilmsGenres() {
    const counts = {};
    const genres = this._setWatchedTimeInterval(this._films, this.currentFilter).reduce((acc, curr) => {
      return acc.concat(curr.genres);
    }, []);
    for (const genre of genres) {
      counts[genre] = (counts[genre] || 0) + 1;
    }
    return counts;
  }

  _setTopGenre() {
    const topGenre = Object.entries(this._setFilmsGenres()).reduce(
        (acc, curr) => acc[1] > curr[1] ? acc : curr, [])[0];
    return topGenre;
  }

  createStats(container) {
    const BAR_HEIGHT = 70;

    container.height = BAR_HEIGHT * 5;

    return new Chart(container, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Object.keys(this._setFilmsGenres()),
        datasets: [{
          data: Object.values(this._setFilmsGenres()),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _getFilmsDuration() {
    return this._setWatchedTimeInterval(this._films, this.currentFilter).reduce(
        (accumulator, currentValue) => accumulator + currentValue.runtime
        , 0);
  }

  _totalDurationHours() {
    return Math.floor(this._getFilmsDuration() / MINUTES_IN_HOUR);
  }

  _durationRemainingMinutes() {
    return this._getFilmsDuration() % MINUTES_IN_HOUR;
  }

  _setWatchedTimeInterval(films, statsFilters) {
    const currentDate = moment();
    const dateWeekAgo = moment().subtract(7, `days`);
    const dateMonthAgo = moment().subtract(1, `month`);
    const dateYearAgo = moment().subtract(1, `year`);

    switch (statsFilters) {
      case StatsFilters.ALL_TIME:
        return films;
      case StatsFilters.TODAY:
        return films
          .filter((film) => film.isAlreadyWatched && moment(film.watchingDate)
            .isSame(currentDate, `day`));
      case StatsFilters.WEEK:
        return films
          .filter((film) => film.isAlreadyWatched && moment(film.watchingDate)
            .isBetween(dateWeekAgo, currentDate));
      case StatsFilters.MONTH:
        return films
          .filter((film) => film.isAlreadyWatched && moment(film.watchingDate)
            .isBetween(dateMonthAgo, currentDate));
      case StatsFilters.YEAR:
        return films
          .filter((film) => film.isAlreadyWatched && moment(film.watchingDate)
            .isBetween(dateYearAgo, currentDate));
      default:
        return films;
    }
  }

  getTemplate() {
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${FilmsModel.getRank(this._films.length)}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this.currentFilter === StatsFilters.ALL_TIME ? `checked` : ``}>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this.currentFilter === StatsFilters.TODAY ? `checked` : ``}>
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this.currentFilter === StatsFilters.WEEK ? `checked` : ``}>
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this.currentFilter === StatsFilters.MONTH ? `checked` : ``}>
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this.currentFilter === StatsFilters.YEAR ? `checked` : ``}>
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._setWatchedTimeInterval(this._films, this.currentFilter).length} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${this._totalDurationHours()} <span class="statistic__item-description">h</span> ${this._durationRemainingMinutes()} <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._setTopGenre() || `----`}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
    );
  }
}
