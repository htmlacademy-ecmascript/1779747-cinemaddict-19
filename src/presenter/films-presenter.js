import {render, remove, RenderPosition} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import CardFilmPresenter from './card-film-presenter.js';
import SortView from '../view/sort-view.js';
import { FILM_CARD_PER_STEP, SortType, UpdateType, UserAction, FilterType} from '../const.js';
import { sortByDate, sortByRating } from '../utils/film.js';
import {filter} from '../utils/filter.js';
//import { getTopRatedFilms, getMostCommentedFilms } from '../utils/film.js';

export default class FilmsPresenter {
  #filmContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #cardFilmPresenters = new Map();

  #filmComponent = new FilmsView();
  #filmList = new FilmsListView();
  #filmListComponent = new FilmsListContainerView();
  #topRatedList = new TopRatedView();
  #topRatedContainer = new FilmsListContainerView();
  #mostCommentedList = new MostCommentedView();
  #mostCommentedContainer = new FilmsListContainerView();
  #noFilmMessage = null;
  #showMoreButtonComponent = null;
  #filterComponent = null;
  #sortComponent = null;
  #renderedFilmCardCount = FILM_CARD_PER_STEP;
  #currentSortType = SortType.SORT_BY_DEFAULT;
  #filterType = FilterType.All;


  #mostRatedFilms = null;
  #mostCommentedFilms = null;


  constructor({filmContainer, filmsModel, commentsModel, filterModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films () {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);
    switch (this.#currentSortType) {
      case SortType.SORT_BY_DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.SORT_BY_RATING:
        return filteredFilms.sort(sortByRating);
    }
    return filteredFilms;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {
    this.#renderFilmList();
  }


  #handleShowMoreButtonClick = () => {
    const filmCardCount = this.films.length;

    const newRenderedFilmCardCount = Math.min(filmCardCount,
      this.#renderedFilmCardCount + FILM_CARD_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCardCount, newRenderedFilmCardCount);

    this.#renderFilms(films, this.#filmListComponent.element);
    this.#renderedFilmCardCount = newRenderedFilmCardCount;

    if (this.#renderedFilmCardCount >= filmCardCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addСomment(updateType, update.commentUser);
        this.#filmsModel.updateFilm(updateType, update.filmCard);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteСomment(updateType, update.commentUser);
        this.#filmsModel.updateFilm(updateType, update.filmCard);
        break;
    }
  };

  #handleModelEvent = (updateType, update) => {
    switch (updateType){
      case UpdateType.PATCH:
        this.#cardFilmPresenters.get(update.id).init(update, this.comments);
        break;
      case UpdateType.MINOR:
        this.#clearFilmList();
        this.#renderFilmList();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmList({resetRenderedFilmCardCount: true, resetSortType: true});
        this.#renderFilmList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList({resetRenderedFilmCardCount: true});
    this.#renderFilmList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#filmComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderFilm(film, filmContainer) {
    const cardFilmPresenter = new CardFilmPresenter({
      filmContainerTeg: filmContainer,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModelEvent
    });

    cardFilmPresenter.init(film, this.comments);
    this.#cardFilmPresenters.set(film.id, cardFilmPresenter);
  }

  #renderFilms(films, filmContainer) {
    films.forEach((film) => this.#renderFilm(film, filmContainer));

  }

  #renderNoFilms() {
    this.#noFilmMessage = new NoFilmView({
      filterType: this.#filterType
    });
    render(this.#noFilmMessage, this.#filmComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleShowMoreButtonClick
    });
    render(this.#showMoreButtonComponent, this.#filmList.element);
  }

  #clearFilmList({resetRenderedFilmCardCount = true, resetSortType = true} = {}) {
    const filmCardCount = this.films.length;
    this.#cardFilmPresenters.forEach((presenter) => presenter.destroy());
    this.#cardFilmPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#filterComponent);
    remove(this.#noFilmMessage);
    remove(this.#showMoreButtonComponent);

    if(resetRenderedFilmCardCount) {
      this.#renderedFilmCardCount = FILM_CARD_PER_STEP;
    }else {
      this.#renderedFilmCardCount = Math.min (filmCardCount, this.#renderedFilmCardCount);

      if(resetSortType) {
        this.#currentSortType = SortType.SORT_BY_DEFAULT;
      }
    }
  }

  #renderFilmList() {
    render(this.#filmComponent, this.#filmContainer);
    const films = this.films;
    const filmCardCount = films.length;

    if (!this.films.length){
      this.#renderNoFilms();
      return;
    }

    render(this.#filmList, this.#filmComponent.element);
    render(this.#filmListComponent, this.#filmList.element);

    this.#renderFilms(films.slice(0, Math.min(filmCardCount, this.#renderedFilmCardCount)), this.#filmListComponent.element);

    if (filmCardCount > this.#renderedFilmCardCount) {
      this.#renderShowMoreButton();

      this.#renderSort();
      //this.#renderTopAndMost();
    }
  }


  // #renderTopAndMost(){

  //   render(this.#topRatedList, this.#filmComponent.element);
  //   render(this.#topRatedContainer, this.#topRatedList.element);

  //   this.#mostRatedFilms = getTopRatedFilms(this.films);
  //   this.#mostCommentedFilms = getMostCommentedFilms(this.films);

  //   this.#mostRatedFilms.forEach((mostRatedFilms) => this.#renderFilm(mostRatedFilms, this.#topRatedContainer.element));

  //   render(this.#mostCommentedList, this.#filmComponent.element);
  //   render(this.#mostCommentedContainer, this.#mostCommentedList.element);

  //   this.#mostCommentedFilms.forEach((mostCommentedFilm) => this.#renderFilm(mostCommentedFilm, this.#mostCommentedContainer.element));


  // }

}

