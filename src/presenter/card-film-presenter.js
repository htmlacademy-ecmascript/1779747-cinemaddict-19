import {render, replace, remove, RenderPosition} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import InfoPopUpView from '../view/info-pop-up-view.js';
import {UserAction, UpdateType} from '../const.js';

const bodyElement = document.querySelector('body');

export default class CardFilmPresenter {

  #filmCardComponent = null;
  #infoPopUpComponent = null;

  #filmContainerTeg = null;

  #filmModelCard = null;
  #commentsModel = null;
  #handleDataChange = null;


  constructor({filmContainerTeg, onDataChange}){
    this.#filmContainerTeg = filmContainerTeg;
    this.#handleDataChange = onDataChange;
  }


  async init (filmModelCard, commentsModel) {
    this.#filmModelCard = filmModelCard;
    this.#commentsModel = commentsModel;

    const commentsFilmCard = await this.#commentsModel.getComments(this.#filmModelCard.id);

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevInfoPopUpComponent = this.#infoPopUpComponent;

    this.#filmCardComponent = new FilmCardView({
      filmModelCard: this.#filmModelCard,
      onFilmCardClick: this.#handleOpenPopUp,
      onWatchListClick:  this.#handleWatchListClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    }
    );

    this.#infoPopUpComponent = new InfoPopUpView({
      filmModelCard: this.#filmModelCard,
      commentsModel: commentsFilmCard,
      onPopUpClick: this.#handleClosePopUp,
      onWatchListClick:  this.#handleWatchListClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
      onDeleteCommentClick:  this.#handleDeleteCommentClick,
      onCommentAdd: this.#handleCommentAdd
    }
    );

    if (prevFilmCardComponent === null || prevInfoPopUpComponent === null){
      render(this.#filmCardComponent, this.#filmContainerTeg, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmContainerTeg.contains(prevFilmCardComponent.element)){
      replace(this.#filmCardComponent, prevFilmCardComponent);

    }
    if(document.body.contains(prevInfoPopUpComponent.element)){
      replace(this.#infoPopUpComponent, prevInfoPopUpComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevInfoPopUpComponent);
  }


  setDeleting({resetIsDisabled = false, resetIsDeleting = false} = {}){
    this.#infoPopUpComponent.updateElement({
      isDisabled: resetIsDeleting,
      isDeleting: resetIsDisabled,
    });
  }

  setAborting() {
    this.#infoPopUpComponent.shake();

  }


  #escKeyDownPopUp = (evt) => {
    if ((evt.key === 'Escape' || evt.key === 'Esc') && !this.#infoPopUpComponent.getIsDeletingComment()){
      evt.preventDefault();
      this.#closePopUp();
      document.removeEventListener('keydown', this.#escKeyDownPopUp);
    }
  };

  #openPopUp (){
    if (bodyElement.contains(document.querySelector('.film-details'))){
      bodyElement.removeChild(document.querySelector('.film-details'));
    }
    render(this.#infoPopUpComponent, bodyElement);
    bodyElement.classList.add('.hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownPopUp);
  }

  #closePopUp (){
    remove(this.#infoPopUpComponent);
    bodyElement.classList.remove('.hide-overflow');
    this.#infoPopUpComponent.reset(this.#filmModelCard);
    document.removeEventListener('keydown', this.#escKeyDownPopUp);
  }


  destroy() {
    remove(this.#filmCardComponent);
    remove(this.#infoPopUpComponent);
  }

  #handleWatchListClick = () => {
    this.#handleDataChange(UserAction.UPDATE_FILM_CARD,
      UpdateType.PATCH, {...this.#filmModelCard, userDetails:
          { ...this.#filmModelCard.userDetails, watchlist:
              !this.#filmModelCard.userDetails.watchlist } });
  };

  #handleWatchedClick = () => {
    this.#handleDataChange(UserAction.UPDATE_FILM_CARD,
      UpdateType.PATCH, {...this.#filmModelCard, userDetails:
          { ...this.#filmModelCard.userDetails, alreadyWatched:
              !this.#filmModelCard.userDetails.alreadyWatched } });
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(UserAction.UPDATE_FILM_CARD,
      UpdateType.PATCH, {...this.#filmModelCard, userDetails:
          { ...this.#filmModelCard.userDetails, favorite:
              !this.#filmModelCard.userDetails.favorite } });
  };

  #handleDeleteCommentClick = (commentId) => {
    this.#filmModelCard.comments = this.#filmModelCard.comments.filter((el) => el !== commentId);
    const filmCard = this.#filmModelCard;

    this.#handleDataChange(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {commentId, filmCard}
    );
  };

  #handleCommentAdd = (emojisLabel, commentInput) => {
    const commentUser = {
      comment: commentInput,
      emotion: emojisLabel
    };
    const filmCard = this.#filmModelCard;

    this.#handleDataChange (
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {commentUser, filmCard}
    );
  };

  #handleOpenPopUp = () => {
    this.#openPopUp();
  };

  #handleClosePopUp = () => {
    this.#closePopUp();
  };

}

