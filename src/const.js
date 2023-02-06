
const FILM_CARD_PER_STEP = 5;
const TOP_AND_MOST_COUNT = 2;

const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Cras aliquet varius magna, non porta ligula feugiat eget. ' +
    'Fusce tristique felis at fermentum pharetra. ' +
    'Aliquam id orci ut lectus varius viverra. ' +
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ' +
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ' +
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. ' +
    'In rutrum ac purus sit amet tempus.';

const COMMENT_EMOTIONS = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const SortType = {
  SORT_BY_DEFAULT: 'Sort_by_default',
  SORT_BY_DATE: 'Sort_by_date',
  SORT_BY_RATING: 'Sort_by_rating',
};

const UserAction = {
  UPDATE_FILM_CARD: 'UPDATE_FILM_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {POSTERS, DESCRIPTION, COMMENT_EMOTIONS, FilterType, FILM_CARD_PER_STEP, TOP_AND_MOST_COUNT, SortType, UserAction, UpdateType};


