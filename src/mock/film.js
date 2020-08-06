import {random} from 'lodash';
import {shuffle} from 'lodash';

const posters = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`
];

const generateTitle = () => {
  const filmTitles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`,
    `The Great Flamarion`,
    `Made for Each Other`
  ];

  const randomIndex = random(0, filmTitles.length - 1);

  return filmTitles[randomIndex];
};

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
  const description = shuffle(text.split(`. `)).slice(0, random(1, 5)).join(`. `);

  return description;
};

const generateRate = () => {
  return random(1.1, 9.9).toFixed(1);
};

const generateDate = () => {
  const time = parseInt(new Date().getTime() / 1000, 10);
  const randomTime = random(time);
  return randomTime;
};

const generateRunTime = () => {
  return random(60, 200);
};

const generateGenres = () => {
  const genres = [`Drama`, `Film-Noir`, `Mystery`, `Musical`, `Western`, `Comedy`, `Cartoon`];
  const randomGenres = shuffle(genres).slice(0, 3);
  return randomGenres;
};

const generateCommentText = () => {
  const commentText = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

  const randomIndex = random(0, commentText.length - 1);

  return commentText[randomIndex];
};

const generateComment = () => {
  return {
    text: generateCommentText()
  };
};

const generateComments = () => {
  const comments = [];

  for (let i = 0; i < random(0, 30); i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generateFilm = () => {
  return {
    title: generateTitle(),
    poster: posters[random(0, posters.length - 1)],
    description: generateDescription(),
    raiting: generateRate(),
    date: generateDate(),
    runtime: generateRunTime(),
    genres: generateGenres(),
    isAddToWatchList: Boolean(random(0, 1)),
    isAlreadyWatched: Boolean(random(0, 1)),
    isAddToFavorites: Boolean(random(0, 1)),
    comments: generateComments()
  };
};

export const generateFilms = () => {
  const films = [];
  for (let i = 0; i < 20; i++) {
    films.push(generateFilm());
  }
  return films;
};
