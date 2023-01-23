import {render, remove} from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import InfoPopUpView from '../view/info-pop-up-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';

const FILM_CARD_PER_STEP = 5;

const bodyElement = document.querySelector('body');


export default class FilmsPresenter {
  #filmContainer = null;
  #filmsModel = null;
  #filmsModelContainer = null;
  #renderedFilmModelCard = FILM_CARD_PER_STEP;

  #filmComponent = new FilmsView();
  #filmList = new FilmsListView();
  #filmListComponent = new FilmsListContainerView();
  #noFilmMessage = new NoFilmView();
  #showMoreButtonComponent = null;


  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  #handleShowMoreButtonClickHandler = () => {
    this.#filmsModelContainer
      .slice(this.#renderedFilmModelCard, this.#renderedFilmModelCard + FILM_CARD_PER_STEP)
      .forEach((filmModelCard) => this.#renderFilm(filmModelCard));

    this.#renderedFilmModelCard += FILM_CARD_PER_STEP;

    if (this.#renderedFilmModelCard >= this.#filmsModelContainer.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  init() {
    this.#filmsModelContainer = [...this.#filmsModel.films];
    render(this.#filmComponent, this.#filmContainer);

    if (!this.#filmsModelContainer.length){
      render(this.#noFilmMessage, this.#filmComponent.element);
      return;
    }

    render(this.#filmList, this.#filmComponent.element);
    render(this.#filmListComponent, this.#filmList.element);


    for (let i = 0; i < Math.min(this.#filmsModelContainer.length, FILM_CARD_PER_STEP); i++) {
      this.#renderFilm(this.#filmsModelContainer[i]);
    }


    if (this.#filmsModelContainer.length > FILM_CARD_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#handleShowMoreButtonClickHandler
      });
      render(this.#showMoreButtonComponent, this.#filmList.element);
    }
  }

  #renderFilm(filmModelCard) {

    const escKeyDownPopUp = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopUp();
        document.removeEventListener('keydown', escKeyDownPopUp);
      }
    };

    const filmCardComponent = new FilmCardView({
      filmModelCard,
      onFilmCardClick: () => {
        openPopUp();
        document.addEventListener('keydown', escKeyDownPopUp);
      }
    });

    const infoPopUpComponent = new InfoPopUpView({
      filmModelCard,
      onCrossClick: () => {
        closePopUp();
        document.removeEventListener('keydown', escKeyDownPopUp);
      }
    });
    function openPopUp () {
      bodyElement.appendChild(infoPopUpComponent.element);
      bodyElement.classList.add('.hide-overflow');
    }

    function closePopUp () {
      bodyElement.removeChild(infoPopUpComponent.element);
      bodyElement.classList.remove('.hide-overflow');
    }

    render(filmCardComponent, this.#filmListComponent.element);
  }
}

