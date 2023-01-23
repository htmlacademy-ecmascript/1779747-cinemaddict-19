import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class FilmsListContainerView extends AbstractView {

  get template() {
    return createFilmsListContainerTemplate();
  }
}
