import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeFilmDueDate, humanizeCommentDueDate, humanizeDuration} from '../utils/film.js';
import { setActiveClass } from '../utils/film.js';
import {COMMENT_EMOTIONS} from '../const';


function createInfoPopUpGenreTemplate(genres){
  return (`${genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`).join('')
  }`
  );
}

function createInfoPopUpCommentTemplate(commentsModel, isDisabled, isDeleting, commentIdAction){
  let liCommentTag = '';
  for (const commentModel of commentsModel){
    const {author, comment, emotion, date} = commentModel;
    liCommentTag += `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${humanizeCommentDueDate(date)}</span>
                <button class="film-details__comment-delete" data-comment-id="${commentModel.id}" ${isDisabled ? 'disabled' : ''}>${(isDeleting && commentIdAction === commentModel.id) ? 'deleting...' : 'delete'}</button>
              </p>
            </div>
          </li>`;
  }
  return liCommentTag;
}

function createInfoPopUpCommentFormTemplate(emojiLabel, commentInput, isDisabled){

  return (`<div class="film-details__add-emoji-label">
${emojiLabel ? `<img src="./images/emoji/${emojiLabel}.png" width="55" height="55" alt="emoji-smile">` : ''}
</div>
 <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"${isDisabled ? 'disabled' : ''}>${commentInput ? commentInput : ''}</textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${(emojiLabel === COMMENT_EMOTIONS.SMILE) ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${(emojiLabel === COMMENT_EMOTIONS.SLEEPING) ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${(emojiLabel === COMMENT_EMOTIONS.PUKE) ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${(emojiLabel === COMMENT_EMOTIONS.ANGRY) ? 'checked' : ''}${isDisabled ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>`);
}

function createInfoPopUpTemplate(state, commentsModel) {

  const {comments, filmInfo, userDetails, isDisabled, isDeleting, commentIdAction} = state;

  const genreTemplate = createInfoPopUpGenreTemplate(filmInfo.genre);
  return (
    `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button"${isDisabled ? 'disabled' : ''}>close</button>
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
                <td class="film-details__cell">${humanizeFilmDueDate(filmInfo.release.date, 'D MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Duration</td>
                <td class="film-details__cell">${humanizeDuration(filmInfo.duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
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
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${setActiveClass(userDetails.watchlist, 'film-details__control-button--active')}" id="watchlist" name="watchlist"${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${setActiveClass(userDetails.alreadyWatched, 'film-details__control-button--active')}" id="watched" name="watched"${isDisabled ? 'disabled' : ''}>Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${setActiveClass(userDetails.favorite, 'film-details__control-button--active')}" id="favorite" name="favorite"${isDisabled ? 'disabled' : ''}>Add to favorites</button>
        </section>
      </div>
  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  
          <ul class="film-details__comments-list">
          ${createInfoPopUpCommentTemplate(commentsModel, isDisabled, isDeleting, commentIdAction)}
          </ul>
          <form class="film-details__new-comment" action="" method="get">
          ${createInfoPopUpCommentFormTemplate(state.emojisLabel, state.commentInput, isDisabled)}
          </form>
        </section>
      </div>
      </div>
  </section>`
  );
}
export default class InfoPopUpView extends AbstractStatefulView {
  #commentsModel = null;
  #handlePopUpClick = null;
  #handleWatchListClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;
  #handleDeleteCommentClick = null;
  #handleCommentAdd = null;

  constructor({filmModelCard, commentsModel, onPopUpClick,
    onWatchListClick, onWatchedClick, onFavoriteClick, onDeleteCommentClick, onCommentAdd}){
    super();
    this._setState(InfoPopUpView.parseCommentToState(filmModelCard));
    this.#commentsModel = commentsModel;
    this.#handlePopUpClick = onPopUpClick;
    this.#handleWatchListClick = onWatchListClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleDeleteCommentClick = onDeleteCommentClick;
    this.#handleCommentAdd = onCommentAdd;

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
    this.element.addEventListener('keydown', this.#commentAddHandler);
    this.element.querySelectorAll('.film-details__comment-delete').forEach((elem) => elem
      .addEventListener('click', this.#deleteCommentHandler));
  }


  get template() {
    return createInfoPopUpTemplate(this._state, this.#commentsModel);
  }

  reset(filmModelCard) {
    this.updateElement(
      InfoPopUpView.parseCommentToState(filmModelCard),
    );
  }

  #clickHandler = () => {
    if (!this._state.isDisabled) {
      this.#handlePopUpClick(InfoPopUpView.parseStateToComment(this._state));
    }
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

  #commentAddHandler = (evt) => {
    if (evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey)
      && this._state.commentInput && this._state.emojisLabel) {
      this.#handleCommentAdd(this._state.emojisLabel, this._state.commentInput);
    }
  };

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      commentIdAction: evt.target.dataset.commentId,
    });
    this.#handleDeleteCommentClick(this._state.commentIdAction);
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


  static parseCommentToState (filmModelCard) {
    return {...filmModelCard,
      emojisLabel: null,
      commentInput: null,
      commentIdDelete: null,
      isDisabled: false,
      isDeleting: false,
      commentIdAction: null,

    };
  }

  static parseStateToComment (state) {
    const filmModelCard = {...state};
    delete filmModelCard.emojisLabel;
    delete filmModelCard.commentInput;
    delete filmModelCard.commentIdDelete;
    delete filmModelCard.isDisabled;
    delete filmModelCard.isDeleting;
    delete filmModelCard.commentIdAction;


    return filmModelCard;
  }

}


