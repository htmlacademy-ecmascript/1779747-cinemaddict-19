import {createElement} from '../render.js';
import {humanizeTaskDueDate, humanizeDuration, getdescriptionSize} from '../utils.js';


function createFilmCardTemplate(film) {
  const {comments, filmInfo} = film;

  return (
    `<article class="film-card">
        <a class="film-card__link">
          <h3 class="film-card__title">${filmInfo.title}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${humanizeTaskDueDate(filmInfo.releaseDate, 'YYYY')}</span>
            <span class="film-card__duration">${humanizeDuration(filmInfo.duration)}</span>
            <span class="film-card__genre">${filmInfo.genre[0]}</span>
          </p>
          <img src=${filmInfo.poster} alt="" class="film-card__poster">
          <p class="film-card__description">${getdescriptionSize(filmInfo.description)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>`
  );
}
export default class FilmCardView {

  constructor({film}){
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}


