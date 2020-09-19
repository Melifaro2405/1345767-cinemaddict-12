import SmartView from "./abstract-smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MINUTES_IN_HOUR = 60;

export default class Statistic extends SmartView {
  constructor(films) {
    super();
    this.activeStatus = `all-time`;
    this._films = films.filter((film) => film.isAddToWatchList);

    this._filmsDuration = this._films.reduce(
        (accumulator, currentValue) => accumulator + currentValue.runtime
        , 0);
    this.createStats(this.getElement().querySelector(`.statistic__chart`));
  }

  _setFilmsGenres() {
    const counts = {};
    const genres = this._films.reduce((acc, curr) => {
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

  _totalDurationHours() {
    return Math.floor(this._filmsDuration / MINUTES_IN_HOUR);
  }

  _durationRemainingMinutes() {
    return this._filmsDuration % MINUTES_IN_HOUR;
  }

  getRank() {
    const count = this._films.length;

    switch (true) {
      case count > 20:
        return `Movie Buff`;
      case count > 10:
        return `Fan`;
      case count > 0:
        return `Novice`;
      default:
        return ``;
    }
  }

  _onStatsChange(evt) {
    evt.preventDefault();
    this.activeStatus = evt.target.value;
    this.createStats();
  }

  getTemplate() {
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this.getRank()}</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>

          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._films.length} <span class="statistic__item-description">movies</span></p>
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
