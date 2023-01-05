import {createElement} from '../render.js';

function createFilmTemplate() {
  return '<section class="films"></section>';
}

export default class FilmListView {
  getTemplate() {
    return createFilmTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
