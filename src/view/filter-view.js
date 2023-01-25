import AbstractView from '../framework/view/abstract-view.js';


function createFilterFilmTemplate (filter) {
  const {name, count} = filter;

  return `<a href=#${name} class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
}


function createFilterTemplate(filters) {

  const filterFilmsTemplate = filters
    .map((filter) => createFilterFilmTemplate (filter))
    .join('');

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterFilmsTemplate}
  </nav>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}){
    super();
    this.#filters = filters;

  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
