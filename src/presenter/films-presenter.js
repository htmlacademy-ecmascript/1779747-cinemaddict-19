import FilmView from '../view/film-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

export default class FilmPresenter {
  filmComponent = new FilmView();
  filmList = new FilmsListView();
  filmListComponent = new FilmsListContainerView();

  constructor({filmContainer}) {
    this.filmContainer = filmContainer;
  }

  init() {
    render(this.filmComponent, this.filmContainer);
    render(this.filmList, this.filmComponent.getElement());
    render(this.filmListComponent, this.filmList.getElement());

    for (let i = 0; i < 4; i++) {
      render(new FilmCardView(), this.filmListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmList.getElement());
  }
}
