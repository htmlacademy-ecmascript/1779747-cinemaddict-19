import AbstractView from '../framework/view/abstract-view.js';

function createFooterStatisticsTemplate(filmsModel) {

  return `<p>${filmsModel.length} movies inside</p>`;
}
export default class FooterStatisticsView extends AbstractView {
  #filmsModel = null;

  constructor({filmsModel}) {
    super();
    this.#filmsModel = filmsModel;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsModel);
  }
}
