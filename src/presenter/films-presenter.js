import {render, remove, RenderPosition} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';
import CardFilmPresenter from './card-film-presenter.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import TopRatedView from '../view/top-rated-view';
import MostCommentedView from '../view/most-commented-view';
import { FILM_CARD_PER_STEP, SortType, UpdateType, UserAction, FilterType} from '../const.js';
import { sortByDate, sortByRating } from '../utils/film.js';
import {filter} from '../utils/filter.js';
import { getTopRatedFilms, getMostCommentedFilms} from '../utils/film.js';


export default class FilmsPresenter {
  #filmContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #cardFilmPresenters = new Map();
  #topAndMostCard = new Map();
  #loadingComponent = new LoadingView();
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
  #filterType = FilterType.ALL;
  #isLoading = true;

  #topRatedFilms = null;
  #mostCommentedFilms = null;


  constructor({filmContainer, filmsModel, commentsModel, filterModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);

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

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM_CARD:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        if (this.#cardFilmPresenters.get(update.filmCard.id)){
          this.#cardFilmPresenters.get(update.filmCard.id).setDeleting({resetIsDisabled: true, resetIsDeleting: true});}
        if (this.#topAndMostCard.get(update.filmCard.id)){
          this.#topAndMostCard.get(update.filmCard.id).setDeleting({resetIsDisabled: true, resetIsDeleting: true});}
        try {
          await this.#commentsModel.addComment(updateType, update.commentUser, update.filmCard.id);
        }catch(error){
          if (this.#cardFilmPresenters.get(update.filmCard.id)){
            this.#cardFilmPresenters.get(update.filmCard.id).setAborting();}
          if (this.#topAndMostCard.get(update.filmCard.id)){
            this.#topAndMostCard.get(update.filmCard.id).setAborting();}
        }
        break;
      case UserAction.DELETE_COMMENT:
        if (this.#cardFilmPresenters.get(update.filmCard.id)){
          this.#cardFilmPresenters.get(update.filmCard.id).setDeleting({resetIsDisabled: true, resetIsDeleting: true});}
        if (this.#topAndMostCard.get(update.filmCard.id)){
          this.#topAndMostCard.get(update.filmCard.id).setDeleting({resetIsDisabled: true, resetIsDeleting: true});}
        try {
          await
          setTimeout(() => this.#commentsModel.deleteComment(updateType, update.commentId, update.filmCard), 5000);
        }catch(error){
          if (this.#cardFilmPresenters.get(update.filmCard.id)){
            this.#cardFilmPresenters.get(update.filmCard.id).setAborting();}
          if (this.#topAndMostCard.get(update.filmCard.id)){
            this.#topAndMostCard.get(update.filmCard.id).setAborting();}
        }
        break;
    }
  };

  #handleModelEvent = (updateType, update) => {
    switch (updateType){
      case UpdateType.PATCH:
        if (update.movie){
          if(this.#cardFilmPresenters.get(update.movie.id)){
            this.#cardFilmPresenters.get(update.movie.id).init(update.movie, this.#commentsModel);}
          if (this.#topAndMostCard.get(update.movie.id)){
            this.#topAndMostCard.get(update.movie.id).init(update.movie, this.#commentsModel);}
          return;
        }
        if (this.#cardFilmPresenters.get(update.id)){
          this.#cardFilmPresenters.get(update.id).init(update, this.#commentsModel);}
        if (this.#topAndMostCard.get(update.id)){
          this.#topAndMostCard.get(update.id).init(update, this.#commentsModel);
        }
        break;
      case UpdateType.MINOR:
        this.#clearFilmList();
        this.#renderFilmList();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmList({resetRenderedFilmCardCount: true, resetSortType: true});
        this.#renderFilmList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    });
    cardFilmPresenter.init(film, this.#commentsModel);
    if(filmContainer === this.#mostCommentedContainer.element || filmContainer === this.#topRatedContainer.element){
      this.#topAndMostCard.set(film.id, cardFilmPresenter);
    }else {
      this.#cardFilmPresenters.set(film.id, cardFilmPresenter);
    }
  }

  #renderFilms(films, filmContainer) {
    films.forEach((film) => this.#renderFilm(film, filmContainer));

  }

  #renderLoading() {
    render(this.#loadingComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);
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
    render(this.#showMoreButtonComponent, this.#filmList.element, RenderPosition.BEFOREEND);
  }

  #clearFilmList({resetRenderedFilmCardCount = false, resetSortType = false} = {}) {
    const filmCardCount = this.films.length;
    this.#cardFilmPresenters.forEach((presenter) => presenter.destroy());
    this.#cardFilmPresenters.clear();
    this.#topAndMostCard.forEach((presenter) => presenter.destroy());
    this.#topAndMostCard.clear();
    remove(this.#sortComponent);
    remove(this.#filterComponent);
    remove(this.#noFilmMessage);
    remove(this.#showMoreButtonComponent);
    remove(this.#filmListComponent);
    remove(this.#topRatedContainer);
    remove(this.#mostCommentedContainer);

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
    render(this.#filmComponent, this.#filmContainer, RenderPosition.BEFOREEND);
    render(this.#filmList, this.#filmComponent.element, RenderPosition.BEFOREEND);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.films;
    const filmCardCount = films.length;

    if (!this.films.length){
      this.#renderNoFilms();
      return;
    }

    render(this.#filmListComponent, this.#filmList.element, RenderPosition.AFTERBEGIN);

    this.#renderFilms(films.slice(0, Math.min(filmCardCount, this.#renderedFilmCardCount)), this.#filmListComponent.element);

    if (filmCardCount > this.#renderedFilmCardCount) {
      this.#renderShowMoreButton();

      this.#renderSort();
      this.#renderTopAndMost(films);
    }
  }

  #renderTopAndMost(films) {
    this.#topRatedFilms = getTopRatedFilms(films);
    this.#mostCommentedFilms = getMostCommentedFilms(films);
    if (this.#topRatedFilms.length !== 0){
      render(this.#topRatedList, this.#filmComponent.element, RenderPosition.BEFOREEND);
      render(this.#topRatedContainer, this.#topRatedList.element);
      this.#renderFilms(this.#topRatedFilms, this.#topRatedContainer.element);
    }
    if(this.#mostCommentedFilms.length > 0){
      render(this.#mostCommentedList, this.#filmComponent.element, RenderPosition.BEFOREEND);
      render(this.#mostCommentedContainer, this.#mostCommentedList.element);
      this.#renderFilms(this.#mostCommentedFilms, this.#mostCommentedContainer.element);
    }
  }

}

