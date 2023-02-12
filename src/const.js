
const FILM_CARD_PER_STEP = 5;
const TOP_AND_MOST_COUNT = 2;

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
  INIT: 'INIT',
};

export {COMMENT_EMOTIONS, FilterType, FILM_CARD_PER_STEP, TOP_AND_MOST_COUNT, SortType, UserAction, UpdateType};


