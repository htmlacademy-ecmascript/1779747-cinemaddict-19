import AbstractView from '../framework/view/abstract-view.js';

function createNoFilmTemplate() {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
}

export default class NoFilmView extends AbstractView {

  get template() {
    return createNoFilmTemplate();
  }

}
