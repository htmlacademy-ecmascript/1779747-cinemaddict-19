import dayjs from 'dayjs';
import { TOP_AND_MOST_COUNT } from '../const.js';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}


function humanizeFilmDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function humanizeCommentDueDate(dueDate) {
  return dayjs().to(dayjs(humanizeFilmDueDate(dueDate, 'YYYY/MM/DD HH:mm')));

}

function humanizeDuration (duration) {
  const HOUR = 60;
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getCroppedDescription (description) {
  return (description.length > 139) ? `${description.slice(0, 139)}...` : `${description}`;
}

function equalElementsInFilmCard(arr, value) {
  for (let i = 0; i < arr.length; i++){
    if (`arr[i].${value}` !== `arr[i + 1].${value}`){
      return false;
    }
  }
  return true;
}

function getTopRatedFilms (filmsModelContainer) {
  const sortFilmCard = filmsModelContainer.sort(sortByRating);
  const value = 'filmInfo.totalRating';
  return (equalElementsInFilmCard(sortFilmCard, value))
    ? [getRandomArrayElement(sortFilmCard), getRandomArrayElement(sortFilmCard)]
    : sortFilmCard.slice(0, TOP_AND_MOST_COUNT);
}

function getMostCommentedFilms (filmsModelContainer) {
  const sortFilmCard = filmsModelContainer.sort(sortByCommented);
  const value = 'comments.length';
  return (equalElementsInFilmCard(sortFilmCard, value))
    ? [getRandomArrayElement(sortFilmCard), getRandomArrayElement(sortFilmCard)]
    : sortFilmCard.slice(0, TOP_AND_MOST_COUNT);
}

function getWeightForNull(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}


function sortByCommented (filmA, filmB) {
  if (filmA.comments.length < filmB.comments.length) {
    return 1;
  }
  if (filmA.comments.length > filmB.comments.length) {
    return -1;
  }
  return 0;
}

function sortByDate(filmA, filmB) {
  const weight = getWeightForNull(filmA.filmInfo.releaseDate, filmB.filmInfo.releaseDate);

  return weight ?? dayjs(filmB.filmInfo.releaseDate).diff(dayjs(filmA.filmInfo.releaseDate));
}


function sortByRating(filmA, filmB) {

  if (filmA.filmInfo.totalRating < filmB.filmInfo.totalRating) {
    return 1;
  }
  if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return -1;
  }
  return 0;
}

function setActiveClass (isActive, className) {
  return isActive ? className : '';
}

export {humanizeFilmDueDate, humanizeDuration, humanizeCommentDueDate, getCroppedDescription,
  getMostCommentedFilms, getTopRatedFilms, setActiveClass, sortByCommented, sortByDate, sortByRating, equalElementsInFilmCard};
