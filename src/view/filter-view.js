import AbstractView from '../framework/view/abstract-view.js';


function createFilterFilmTemplate (filter, currentFilter) {
  const {name, count} = filter;
  const filterFilmsTemplate = (name === 'All movies')
    ? `<a href="#all" class="main-navigation__item ${currentFilter ? 'main-navigation__item--active' : ''}" data-filter="${name}">All movies</a>`
    : `<a href="#watchlist" class="main-navigation__item ${currentFilter ? 'main-navigation__item--active' : ''}" data-filter="${name}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
  return filterFilmsTemplate;
}


function createFilterTemplate(filters, currentFilter) {
  const filterFilmsTemplate = filters
    .map((filter) => createFilterFilmTemplate (filter, filter.name === currentFilter))
    .join('');

  return (
    `<nav class="main-navigation">
    ${filterFilmsTemplate}
  </nav>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    const filter = evt.target.dataset.filter;
    if (filter !== this.#currentFilter) {
      this.#handleFilterTypeChange(filter);
    }
  };
}

