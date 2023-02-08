import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListTemplate() {
  return `<section class="films-list">
  </section>`;
}

export default class FilmsListView extends AbstractView {

  get template() {
    return createFilmsListTemplate();
  }
}
