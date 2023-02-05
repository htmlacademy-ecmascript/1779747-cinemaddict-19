import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeFilmDueDate, humanizeCommentDueDate, humanizeDuration} from '../utils/film.js';
import {mockComments} from '../mock/comment.js';
import { setActiveClass } from '../utils/film.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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
                <span class="film-details__comment-day">${humanizeCommentDueDate(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    }
  }
  return liCommentTag;
}

function createInfoPopUpCommentFormTemplate(emojiLabel, commentInput){

  return (`<div class="film-details__add-emoji-label">
${emojiLabel ? `<img src="./images/emoji/${emojiLabel}.png" width="55" height="55" alt="emoji-smile">` : ''}
</div>
 <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentInput ? commentInput : ''}</textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${(emojiLabel === 'smile') ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${(emojiLabel === 'sleeping') ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${(emojiLabel === 'puke') ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${(emojiLabel === 'angry') ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>`);
}

function createInfoPopUpTemplate(state) {
  const {comments, filmInfo, userDetails} = state;

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
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${setActiveClass(userDetails.watchlist, 'film-details__control-button--active')}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${setActiveClass(userDetails.alreadyWatched, 'film-details__control-button--active')}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${setActiveClass(userDetails.favorite, 'film-details__control-button--active')}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  
          <ul class="film-details__comments-list">
          ${createInfoPopUpCommentTemplate(comments)}
          </ul>
          <form class="film-details__new-comment" action="" method="get">
          ${createInfoPopUpCommentFormTemplate(state.emojisLabel, state.commentInput)}
          </form>
        </section>
      </div>
    </div>
  </section>`
  );
}
export default class InfoPopUpView extends AbstractStatefulView {
  #handlePopUpClick = null;
  #handleWatchListClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({filmModelCard, onPopUpClick,
    onWatchListClick, onWatchedClick, onFavoriteClick}){
    super();
    this._setState(InfoPopUpView.parseCommentToState(filmModelCard));
    this.#handlePopUpClick = onPopUpClick;
    this.#handleWatchListClick = onWatchListClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#clickHandler);
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchListHandler);
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedHandler);
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteHandler);
    this.element.querySelectorAll('.visually-hidden').forEach((elem) => elem
      .addEventListener('click', this.#emojisLabelHandler));
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
    // this.element.querySelectorAll('.film-details__comment-delete').forEach((elem) => elem
    //   .addEventListener('click', this.#deleteCommentHandler));
    // this.element.addEventListener('scroll', this.#scrollHandler);
  }


  get template() {
    return createInfoPopUpTemplate(this._state);
  }

  reset(filmModelCard) {
    this.updateElement(
      InfoPopUpView.parseCommentToState(filmModelCard),
    );
  }

  #clickHandler = () => {
    this.#handlePopUpClick(InfoPopUpView.parseStateToComment(this._state));
  };

  #emojisLabelHandler = (evt) => {
    evt.preventDefault();
    const scroll = this.element.scrollTop;
    this.updateElement({
      emojisLabel: evt.target.value,
    });
    this.element.scrollTop = scroll;

  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      commentInput: evt.target.value,
    });
  };

  // #deleteCommentHandler = (evt) => {
  //   evt.preventDefault();
  // };


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

  static parseCommentToState (filmModelCard) {
    return {...filmModelCard,
      emojisLabel: null,
      commentInput: null,
    };
  }

  static parseStateToComment (state) {
    const filmModelCard = {...state};
    delete filmModelCard.emojisLabel;
    delete filmModelCard.comment;

    return filmModelCard;
  }

}


