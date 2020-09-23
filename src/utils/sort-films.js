import moment from "moment";

export const sortFilmDate = (FilmA, FilmB) => {
  return (moment(FilmA.releaseDate).isBefore(FilmB.releaseDate)) ? 1 : -1;
};

export const sortFilmRating = (FilmA, FilmB) => {
  return FilmB.raiting - FilmA.raiting;
};
