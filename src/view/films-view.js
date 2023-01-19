import {createElement} from '../render.js';

function createFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class FilmsView {
  #element = null;

  get template() {
    return createFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
