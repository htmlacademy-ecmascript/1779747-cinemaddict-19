import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import InfoPopUpView from '../view/info-pop-up-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';
import NoFilmView from '../view/no-film-view.js';

const FILM_MODEL_CARD_PER_STEP = 5;

const bodyElement = document.querySelector('body');


export default class FilmsPresenter {
  #filmContainer = null;
  #filmsModel = null;
  #filmsModelContainer = null;
  #renderedFilmModelCard = FILM_MODEL_CARD_PER_STEP;

  #filmComponent = new FilmsView();
  #filmList = new FilmsListView();
  #filmListComponent = new FilmsListContainerView();
  #noFilmMessage = new NoFilmView();
  #showMoreButtonComponent = null;


  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  #showMoreButtonClickHandler = () => {
    this.#filmsModelContainer
      .slice(this.#renderedFilmModelCard, this.#renderedFilmModelCard + FILM_MODEL_CARD_PER_STEP)
      .forEach((filmModelCard) => this.#renderFilm(filmModelCard));

    this.#renderedFilmModelCard += FILM_MODEL_CARD_PER_STEP;

    if (this.#renderedFilmModelCard >= this.#filmsModelContainer.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
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


    for (let i = 0; i < Math.min(this.#filmsModelContainer.length, FILM_MODEL_CARD_PER_STEP); i++) {
      this.#renderFilm(this.#filmsModelContainer[i]);
    }


    if (this.#filmsModelContainer.length > FILM_MODEL_CARD_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView();
      render(this.#showMoreButtonComponent, this.#filmList.element);
      this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);

    }

  }

  #renderFilm(filmModelCard) {
    const filmCardComponent = new FilmCardView({filmModelCard});
    const infoPopUpComponent = new InfoPopUpView({filmModelCard});

    const openPopUp = () => {
      bodyElement.appendChild(infoPopUpComponent.element);
      bodyElement.classList.add('.hide-overflow');

    };

    const closePopUp = () => {
      bodyElement.removeChild(infoPopUpComponent.element);
      bodyElement.classList.remove('.hide-overflow');

    };
    const escKeyDownPopUp = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopUp();
        document.removeEventListener('keydown', escKeyDownPopUp);
      }
    };

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      openPopUp();
      document.addEventListener('keydown', escKeyDownPopUp);
    });

    infoPopUpComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopUp();
      document.removeEventListener('keydown', escKeyDownPopUp);
    });
    render(filmCardComponent, this.#filmListComponent.element);
  }
}

