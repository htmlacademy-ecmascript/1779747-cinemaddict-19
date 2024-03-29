import AbstractView from '../framework/view/abstract-view.js';
import {humanizeFilmDueDate, humanizeDuration, getCroppedDescription} from '../utils/film.js';
import { setActiveClass } from '../utils/film.js';


function createFilmCardTemplate(filmModelCard) {
  const {comments, filmInfo, userDetails} = filmModelCard;

  return (
    `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${filmInfo.title}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${humanizeFilmDueDate(filmInfo.release.date, 'YYYY')}</span>
            <span class="film-card__duration">${humanizeDuration(filmInfo.duration)}</span>
            <span class="film-card__genre">${filmInfo.genre[0]}</span>
          </p>
          <img src=${filmInfo.poster} alt="" class="film-card__poster">
          <p class="film-card__description">${getCroppedDescription(filmInfo.description)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${setActiveClass(userDetails.watchlist, 'film-card__controls-item--active')}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${setActiveClass(userDetails.alreadyWatched, 'film-card__controls-item--active')}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${setActiveClass(userDetails.favorite, 'film-card__controls-item--active')}" type="button">Mark as favorite</button>
        </div>
      </article>`
  );
}
export default class FilmCardView extends AbstractView {
  #filmModelCard = null;
  #handleFilmCardClick = null;
  #handleWatchListClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({filmModelCard, onFilmCardClick,
    onWatchListClick, onWatchedClick, onFavoriteClick}){
    super();
    this.#filmModelCard = filmModelCard;
    this.#handleFilmCardClick = onFilmCardClick;
    this.#handleWatchListClick = onWatchListClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#clickFilmCardHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#watchListHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#watchedHandler);
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#filmModelCard);
  }

  #clickFilmCardHandler = () => {
    this.#handleFilmCardClick();
  };

  #watchListHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchListClick();
  };

  #watchedHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchedClick();
  };

  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
