import AbstractView from '../framework/view/abstract-view.js';
import {humanizeFilmDueDate, humanizeDuration} from '../utils/film.js';
import {mockComments} from '../mock/comment.js';
import { setPopUpActiveClass } from '../utils/common.js';


function createInfoPopUpGenreTemplate(genres){
  return (`${genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`).join('')
  }`
  );
}

function createInfoPopUpCommentTemplate(comments){
  let liCommentTag = '';
  for (const commentId of comments){
    if (mockComments.find((x) => x.id === commentId)) {
      const {author, comment, emotion, date} = mockComments[commentId];

      liCommentTag += `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${humanizeFilmDueDate(date, 'YYYY/MM/DD HH:mm')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    }
  }
  return liCommentTag;
}


function createInfoPopUpTemplate(filmModelCard) {
  const {comments, filmInfo, userDetails} = filmModelCard;

  const genreTemplate = createInfoPopUpGenreTemplate(filmInfo.genre);

  return (
    `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${filmInfo.poster} alt="">
             <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeFilmDueDate(filmInfo.releaseDate, 'D MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Duration</td>
                <td class="film-details__cell">${humanizeDuration(filmInfo.duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${genreTemplate}</td>
                </tr>
            </table>
  
            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${setPopUpActiveClass(userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${setPopUpActiveClass(userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${setPopUpActiveClass(userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  
          <ul class="film-details__comments-list">
          ${createInfoPopUpCommentTemplate(comments)}
          </ul>
          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label"></div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>`
  );
}
export default class InfoPopUpView extends AbstractView {
  #filmModelCard = null;
  #handlePopUpClick = null;
  #handleWatchListClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({filmModelCard, onPopUpClick,
    onWatchListClick, onWatchedClick, onFavoriteClick}){
    super();
    this.#filmModelCard = filmModelCard;
    this.#handlePopUpClick = onPopUpClick;
    this.#handleWatchListClick = onWatchListClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchListHandler);
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedHandler);
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteHandler);
  }


  get template() {
    return createInfoPopUpTemplate(this.#filmModelCard);
  }

  #clickHandler = () => {
    this.#handlePopUpClick();
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


