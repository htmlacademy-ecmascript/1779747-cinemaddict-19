import {nanoid} from 'nanoid';
import {getDescriptionRandom, getCommentsRandom} from '../utils/film.js';
import { getRandomArrayElement } from '../utils/common.js';
import {POSTERS, DESCRIPTION} from '../const.js';
import {mockComments} from './comment.js';


const mockFilms = [
  {
    comments: getCommentsRandom(mockComments),
    filmInfo: {
      title: 'A Little Pony Without The Carpet',
      alternativeTitle: 'A Little Pony Without The Carpet',
      totalRating: 5.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 16,
      director: 'Tom Ford',
      writers: [
        'Takeshi Kitano'
      ],
      actors: [
        'Morgan Freeman'
      ],
      releaseDate: '2019-05-11T00:00:00.000Z',
      releaseCountry: [
        'Finland'
      ],
      duration: 77,
      genre: [
        'Comedy'
      ],
      description: getDescriptionRandom(DESCRIPTION)
    },
    userDetails: {
      watchlist: Math.random() < 0.5,
      alreadyWatched: Math.random() < 0.5,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Math.random() < 0.5
    }
  },
  {
    comments: getCommentsRandom(mockComments),
    filmInfo: {
      title: 'The Dance of Life',
      alternativeTitle: 'The Dance of Life',
      totalRating: 8.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 14,
      director: 'John Cromwell',
      writers: [
        'Benjamin Glazer', 'Julian Johnson'
      ],
      actors: [
        'Hal Skelly', 'Nancy Carroll'
      ],
      releaseDate: '1929-08-16T00:00:00.000Z',
      releaseCountry: 'United States',
      duration: 115,
      genre: [
        'Musical'
      ],
      description: getDescriptionRandom(DESCRIPTION)
    },
    userDetails: {
      watchlist: Math.random() < 0.5,
      alreadyWatched: Math.random() < 0.5,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Math.random() < 0.5
    }
  },
  {
    comments: getCommentsRandom(mockComments),
    filmInfo: {
      title: 'Sagebrush Trail',
      alternativeTitle: 'Sagebrush Trail',
      totalRating: 3.2,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 18,
      director: 'Armand Schaefer',
      writers: [
        'Lindsley Parsons', 'Will Beale'
      ],
      actors: [
        'John Wayne', 'Nancy Shubert', 'Lane Chandler', 'Yakima Canutt'
      ],
      releaseDate: '1933-12-15T00:00:00.000Z',
      releaseCountry: 'United States',
      duration: 54,
      genre: [
        'Western'
      ],
      description: getDescriptionRandom(DESCRIPTION)
    },
    userDetails: {
      watchlist: Math.random() < 0.5,
      alreadyWatched: Math.random() < 0.5,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Math.random() < 0.5
    }
  },
  {
    comments: getCommentsRandom(mockComments),
    filmInfo: {
      title: 'The Man with the Golden Arm',
      alternativeTitle: 'The Man with the Golden Arm',
      totalRating: 9.0,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 18,
      director: 'Otto Preminger',
      writers: [
        'Walter Newman'
      ],
      actors: [
        'Frank Sinatra', 'Eleanor Parker'
      ],
      releaseDate: '1955-12-15T00:00:00.000Z',
      releaseCountry: 'United States',
      duration: 119,
      genre: [
        'Drama',
        'Western'
      ],
      description: getDescriptionRandom(DESCRIPTION)
    },
    userDetails: {
      watchlist: Math.random() < 0.5,
      alreadyWatched: Math.random() < 0.5,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Math.random() < 0.5
    }
  },
  {
    comments: getCommentsRandom(mockComments),
    filmInfo: {
      title: 'Santa Claus Conquers the Martians',
      alternativeTitle: 'Santa Claus Conquers the Martians',
      totalRating: 2.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 6,
      director: 'Nicholas Webster',
      writers: [
        'Glenville Mareth'
      ],
      actors: [
        'John Call', 'Vincent Beck'
      ],
      releaseDate: '1964-11-14T00:00:00.000Z',
      releaseCountry: 'United States',
      duration: 81,
      genre: [
        'Comedy',
        'Drama'
      ],
      description: getDescriptionRandom(DESCRIPTION)
    },
    userDetails: {
      watchlist: Math.random() < 0.5,
      alreadyWatched: Math.random() < 0.5,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Math.random() < 0.5
    }
  }
];

function getRandomFilm() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockFilms)
  };
}
export {getRandomFilm, mockFilms};
