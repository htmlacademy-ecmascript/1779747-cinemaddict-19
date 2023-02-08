import Observable from '../framework/observable.js';


export default class CommentModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor({commentsApiService}){
    super();
    this.#commentsApiService = commentsApiService;
  }

  async getComment(filmId) {
    this.#comments = await this.#commentsApiService.get(filmId);
    return this.#comments;
  }


  async addComment (updateType, commentUser, filmCardId) {
    try {
      const newComment = this.#adaptToClient(await this.#commentsApiService.addComment(commentUser, filmCardId));
      this._notify(updateType, newComment);

    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  }

  async deleteComment(updateType, commentId, filmCard) {
    try {
      await this.#commentsApiService.deleteComment(commentId);
      this._notify(updateType, filmCard);
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  }

  #adaptToClient(film) {
    const adaptedFilm = {
      comments: film['comments'],
      movie: {
        id: film['movie']['id'],
        comments: film['movie']['comments'],
        filmInfo: {
          ...film['movie']['film_info'],
          ageRating: film['movie']['film_info']['age_rating'],
          alternativeTitle: film['movie']['film_info']['alternative_title'],
          totalRating: film['movie']['film_info']['total_rating'],
          release: {
            date: film['movie']['film_info']['release']['date'],
            releaseCountry: film['movie']['film_info']['release']['release_country']
          }
        },
        userDetails: {
          ...film['movie']['user_details'],
          alreadyWatched: film['movie']['user_details']['already_watched'],
          watchingDate: film['movie']['user_details']['watching_date'],
        }
      }
    };


    delete adaptedFilm['movie']['filmInfo']['age_rating'];
    delete adaptedFilm['movie']['filmInfo']['alternative_title'];
    delete adaptedFilm['movie']['filmInfo']['total_rating'];
    delete adaptedFilm['movie']['userDetails']['already_watched'];
    delete adaptedFilm['movie']['userDetails']['watching_date'];

    return adaptedFilm;
  }
}
