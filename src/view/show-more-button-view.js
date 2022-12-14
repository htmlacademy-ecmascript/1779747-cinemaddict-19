import {createElement} from '../render.js';

function createShowMoreButtonTemplate() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class ShowMoreButtonView{
  getTemplate() {
    return createShowMoreButtonTemplate();
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
