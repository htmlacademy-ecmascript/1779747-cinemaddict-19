function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max){
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}
function updateFilmCard(filmCards, update) {
  return filmCards.map((filmCard) => filmCard.id === update.id ? update : filmCard);

}

const topRatedFilmSort = (filmsModelContainers) => filmsModelContainers.slice().sort((a, b) => {
  if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
    return 1;
  }
  if (a.filmInfo.totalRating > b.filmInfo.totalRating) {
    return -1;
  }
  return 0;
}).slice(0, 2);

const commentedFilmSort = (filmsModelContainers) => filmsModelContainers.slice().sort((a, b) => {
  if (a.comments.length < b.comments.length) {
    return 1;
  }
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  return 0;
}).slice(0, 2);


function setFilmCardActiveClass (element) {
  return element ? 'film-card__controls-item--active' : '';

}

function setPopUpActiveClass (element) {
  return element ? 'film-details__control-button--active' : '';

}

export {getRandomArrayElement, getRandomNumber, updateFilmCard, setFilmCardActiveClass, setPopUpActiveClass, topRatedFilmSort, commentedFilmSort};
