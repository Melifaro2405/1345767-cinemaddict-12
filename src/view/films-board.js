import AbstractView from "./abstract.js";

export default class FilmsBoard extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
