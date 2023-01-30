import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import InfoPopUpView from '../view/info-pop-up-view.js';

const bodyElement = document.querySelector('body');


export default class CardFilmPresenter {

  #filmCardComponent = null;
  #infoPopUpComponent = null;

  #filmContainerTeg = null;

  #filmModelCard = null;
  #handleDataChange = null;


  constructor({filmContainerTeg, onDataChange}){
    this.#filmContainerTeg = filmContainerTeg;
    this.#handleDataChange = onDataChange;
  }


  init (filmModelCard) {
    this.#filmModelCard = filmModelCard;

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
      onPopUpClick: this.#handleClosePopUp,
      onWatchListClick:  this.#handleWatchListClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    }
    );

    if (prevFilmCardComponent === null || prevInfoPopUpComponent === null){
      render(this.#filmCardComponent, this.#filmContainerTeg);
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
  };

  #escKeyDownPopUp = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopUp();
      document.removeEventListener('keydown', this.#escKeyDownPopUp);
    }
  };

  #openPopUp (){
    if (bodyElement.contains(document.querySelector('.film-details'))){
      bodyElement.removeChild(document.querySelector('.film-details'));
    }
    bodyElement.appendChild(this.#infoPopUpComponent.element);
    bodyElement.classList.add('.hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownPopUp);
  }

  #closePopUp (){
    bodyElement.removeChild(this.#infoPopUpComponent.element);
    bodyElement.classList.remove('.hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownPopUp);
  }


  destroy() {
    remove(this.#filmCardComponent);
    remove(this.#infoPopUpComponent);
  }

  #handleWatchListClick = () => {
    this.#handleDataChange({...this.#filmModelCard, userDetails: { ...this.#filmModelCard.userDetails, watchlist: !this.#filmModelCard.userDetails.watchlist } });
  };

  #handleWatchedClick = () => {
    this.#handleDataChange({...this.#filmModelCard, userDetails: { ...this.#filmModelCard.userDetails, alreadyWatched: !this.#filmModelCard.userDetails.alreadyWatched } });
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#filmModelCard, userDetails: { ...this.#filmModelCard.userDetails, favorite: !this.#filmModelCard.userDetails.favorite } });
  };


  #handleOpenPopUp = () => {
    this.#openPopUp();
  };

  #handleClosePopUp = () => {
    this.#closePopUp();
  };

}
