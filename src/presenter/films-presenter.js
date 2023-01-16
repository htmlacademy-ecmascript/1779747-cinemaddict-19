import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';


export default class FilmsPresenter {
  filmComponent = new FilmsView();
  filmList = new FilmsListView();
  filmListComponent = new FilmsListContainerView();

  constructor({filmContainer, filmsModel}) {
    this.filmContainer = filmContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    const iconFilm = [...this.filmsModel.getFilms()];
    render(this.filmComponent, this.filmContainer);
    render(this.filmList, this.filmComponent.getElement());
    render(this.filmListComponent, this.filmList.getElement());

    for (let i = 0; i < iconFilm.length; i++) {
      render(new FilmCardView({film: iconFilm[i]}), this.filmListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmList.getElement());
  }
}

