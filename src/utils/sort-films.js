export const sortFilmDate = (FilmA, FilmB) => {
  return FilmB.releaseDate - FilmA.releaseDate;
};

export const sortFilmRating = (FilmA, FilmB) => {
  return FilmB.raiting - FilmA.raiting;
};
