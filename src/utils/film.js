import dayjs from 'dayjs';
import { getRandomArrayElement } from './common.js';
import { TOP_AND_MOST_COUNT } from '../const.js';


function getDescriptionRandom (description) {
  const desc = description.split('. ').map((i)=>i.replace(/\.*$/,'.'));
  let text = '';
  for (let i = 0; i <= Math.floor(Math.random() * desc.length); i++){
    text += `${getRandomArrayElement(desc)} `;
    text += ' ';
  }
  return text;
}

function getCommentsRandom (comments) {
  const commentArray = [];
  const numberComment = Math.floor(Math.random() * comments.length);
  for (let i = 0; i <= numberComment; i++){
    commentArray[i] = (Math.floor(Math.random() * comments.length));
  }
  return commentArray;
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

function updateFilmCard(filmCards, update) {
  return filmCards.map((filmCard) => filmCard.id === update.id ? update : filmCard);

}

function getTopRatedFilms (filmsModelContainer) {
  return filmsModelContainer.sort(sortByRating).slice(0, TOP_AND_MOST_COUNT);
}

function getMostCommentedFilms (filmsModelContainer) {
  return filmsModelContainer.sort(sortByCommented).slice(0, TOP_AND_MOST_COUNT);
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

export {getDescriptionRandom, getCommentsRandom, humanizeFilmDueDate, humanizeDuration, humanizeCommentDueDate, getCroppedDescription, updateFilmCard, getMostCommentedFilms, getRandomArrayElement, getTopRatedFilms, setActiveClass, sortByCommented, sortByDate, sortByRating};
