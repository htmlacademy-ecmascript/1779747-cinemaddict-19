import {render, remove} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import CardFilmPresenter from './card-film-presenter.js';
import { updateFilmCard, getTopRatedFilms, getMostCommentedFilms } from '../utils/common.js';
import { FILM_CARD_PER_STEP } from '../const.js';

export default class FilmsPresenter {
  #filmContainer = null;
  #filmsModel = null;
  #filmsModelContainer = [];
  #cardFilmPresenters = new Map();
  #renderedFilmModelCard = FILM_CARD_PER_STEP;

  #filmComponent = new FilmsView();
  #filmList = new FilmsListView();
  #filmListComponent = new FilmsListContainerView();
  #noFilmMessage = new NoFilmView();
  #topRatedList = new TopRatedView();
  #topRatedContainer = new FilmsListContainerView();
  #mostCommentedList = new MostCommentedView();
  #mostCommentedContainer = new FilmsListContainerView();
  #showMoreButtonComponent = null;

  #mostRatedFilms = null;
  #mostCommentedFilms = null;


  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }


  init() {
    this.#filmsModelContainer = [...this.#filmsModel.films];
    //this.#sourcedFilmsModelContainer = [...this.#filmsModel.films];


    render(this.#filmComponent, this.#filmContainer);

    if (!this.#filmsModelContainer.length){
      render(this.#noFilmMessage, this.#filmComponent.element);
      return;
    }

    render(this.#filmList, this.#filmComponent.element);
    render(this.#filmListComponent, this.#filmList.element);

    for (let i = 0; i < Math.min(this.#filmsModelContainer.length, FILM_CARD_PER_STEP); i++) {
      this.#renderFilm(this.#filmsModelContainer[i], this.#filmListComponent.element);
    }


    if (this.#filmsModelContainer.length > FILM_CARD_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#handleShowMoreButtonClick
      });
      render(this.#showMoreButtonComponent, this.#filmList.element);
    }

    this.#renderTopAndMost();
  }

  #handleShowMoreButtonClick = () => {
    this.#filmsModelContainer
      .slice(this.#renderedFilmModelCard, this.#renderedFilmModelCard + FILM_CARD_PER_STEP)
      .forEach((filmModelCard) => this.#renderFilm(filmModelCard, this.#filmListComponent.element));

    this.#renderedFilmModelCard += FILM_CARD_PER_STEP;

    if (this.#renderedFilmModelCard >= this.#filmsModelContainer.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleFilmCardChange = (updatedFilm) => {
    this.#filmsModelContainer = updateFilmCard(this.#filmsModelContainer, updatedFilm);
    this.#cardFilmPresenters.get(updatedFilm.id).init(updatedFilm);
  };


  #renderFilm(filmModelCard, filmContainer) {
    const cardFilmPresenter = new CardFilmPresenter({
      filmContainerTeg: filmContainer,
      onDataChange: this.#handleFilmCardChange
    });

    cardFilmPresenter.init(filmModelCard);
    this.#cardFilmPresenters.set(filmModelCard.id, cardFilmPresenter);
  }


  #renderTopAndMost(){

    render(this.#topRatedList, this.#filmComponent.element);
    render(this.#topRatedContainer, this.#topRatedList.element);

    this.#mostRatedFilms = getTopRatedFilms(this.#filmsModelContainer);
    this.#mostCommentedFilms = getMostCommentedFilms(this.#filmsModelContainer);

    this.#mostRatedFilms.forEach((mostRatedFilms) => this.#renderFilm(mostRatedFilms, this.#topRatedContainer.element));

    render(this.#mostCommentedList, this.#filmComponent.element);
    render(this.#mostCommentedContainer, this.#mostCommentedList.element);

    this.#mostCommentedFilms.forEach((mostCommentedFilm) => this.#renderFilm(mostCommentedFilm, this.#mostCommentedContainer.element));


  }
}
