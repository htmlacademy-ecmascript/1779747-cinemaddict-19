import {render, remove, RenderPosition} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import CardFilmPresenter from './card-film-presenter.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import { FILM_CARD_PER_STEP} from '../const.js';
import { SortType } from '../const.js';
import { updateFilmCard, getTopRatedFilms, getMostCommentedFilms, sortByDate, sortByRating } from '../utils/film.js';
import {generateFilter} from '../mock/filter.js';

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
  #currentSortType = SortType.SORT_BY_DEFAULT;
  #sourcedFilmsModelContainer = [];
  #sortComponent = null;

  #mostRatedFilms = null;
  #mostCommentedFilms = null;


  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }


  init() {
    this.#filmsModelContainer = [...this.#filmsModel.films];
    this.#sourcedFilmsModelContainer = [...this.#filmsModel.films];
    render(this.#filmComponent, this.#filmContainer);

    if (!this.#filmsModelContainer.length){
      render(this.#noFilmMessage, this.#filmComponent.element);
      return;
    }

    render(this.#filmList, this.#filmComponent.element);

    this.#renderFilmList();
    this.#renderSort();
    this.#renderFilter();
    //this.#renderTopAndMost();
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  };

  #renderFilter() {
    const filters = generateFilter(this.#filmsModelContainer);
    render(new FilterView({filters}), this.#filmContainer, RenderPosition.AFTERBEGIN);
  }

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.SORT_BY_DATE:
        this.#filmsModelContainer.sort(sortByDate);
        break;
      case SortType.SORT_BY_RATING:
        this.#filmsModelContainer.sort(sortByRating);

        break;
      default:
        this.#filmsModelContainer = [...this.#sourcedFilmsModelContainer];
    }

    this.#currentSortType = sortType;
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#filmContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilm(filmModelCard, filmContainer) {
    const cardFilmPresenter = new CardFilmPresenter({
      filmContainerTeg: filmContainer,
      onDataChange: this.#handleFilmCardChange
    });

    cardFilmPresenter.init(filmModelCard);
    this.#cardFilmPresenters.set(filmModelCard.id, cardFilmPresenter);
  }

  #renderFilms(from, to, container) {
    this.#filmsModelContainer
      .slice(from, to)
      .forEach((filmModelCard) => this.#renderFilm(filmModelCard, container));
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleShowMoreButtonClick
    });
    render(this.#showMoreButtonComponent, this.#filmList.element);
  }

  #clearFilmList() {
    this.#cardFilmPresenters.forEach((presenter) => presenter.destroy());
    this.#cardFilmPresenters.clear();
    this.#renderedFilmModelCard = FILM_CARD_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderFilmList() {
    render(this.#filmListComponent, this.#filmList.element);
    this.#renderFilms(0, Math.min(this.#filmsModelContainer.length, FILM_CARD_PER_STEP), this.#filmListComponent.element);

    if (this.#filmsModelContainer.length > FILM_CARD_PER_STEP) {
      this.#renderShowMoreButton();
    }
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
