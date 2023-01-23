import AbstractView from '../framework/view/abstract-view.js';

function createFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class FilmsView extends AbstractView {

  get template() {
    return createFilmsTemplate();
  }
}
