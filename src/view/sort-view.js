import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortTemplate(currentSortType) {
  return (
    `<ul class="sort">
    <li><a href="#${SortType.SORT_BY_DEFAULT}" class="sort__button ${currentSortType === SortType.SORT_BY_DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.SORT_BY_DEFAULT}">Sort by default</a></li>
    <li><a href="#${SortType.SORT_BY_DATE}" class="sort__button ${currentSortType === SortType.SORT_BY_DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.SORT_BY_DATE}">Sort by date</a></li>
    <li><a href="#${SortType.SORT_BY_RATING}" class="sort__button ${currentSortType === SortType.SORT_BY_RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.SORT_BY_RATING}">Sort by rating</a></li>
  </ul>`
  );
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }


  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
