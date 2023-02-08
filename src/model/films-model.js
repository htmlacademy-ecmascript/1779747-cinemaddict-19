import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class FilmsModel extends Observable{
  #filmsApiService = null;
  #films = [];

  constructor({filmsApiService}){
    super();
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  async init() {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }
    this._notify (UpdateType.INIT);
  }

  async updateFilm(updateType, filmCard) {
    const index = this.#films.findIndex((film) =>
      film.id === filmCard.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');

    }

    try {
      const response = await this.#filmsApiService.updateFilm(filmCard);
      const updated = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updated,
        ...this.#films.slice(index + 1),
      ];

      this._notify(updateType, updated);
    }catch(err) {
      throw new Error('Can\'t update film');
    }
  }

  #adaptToClient(film) {
    const adaptedFilm = {
      id: film['id'],
      comments: film['comments'],
      filmInfo: {
        ...film['film_info'],
        ageRating: film['film_info']['age_rating'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        release: {
          date: film['film_info']['release']['date'],
          releaseCountry: film['film_info']['release']['release_country']
        }
      },
      userDetails: {
        ...film['user_details'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date'],
      }
    };


    delete adaptedFilm['filmInfo']['age_rating'];
    delete adaptedFilm['filmInfo']['alternative_title'];
    delete adaptedFilm['filmInfo']['total_rating'];
    delete adaptedFilm['userDetails']['already_watched'];
    delete adaptedFilm['userDetails']['watching_date'];

    return adaptedFilm;
  }
}

