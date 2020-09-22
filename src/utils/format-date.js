import moment from "moment";

export const formatFilmYear = (date) => moment(date).format(`YYYY`);

export const formatFilmFullDate = (date) => moment(date).format(`D MMMM YYYY`);

export const formatFilmRunTime = (time) => (moment.utc(moment.duration(time, `minutes`)
  .as(`milliseconds`)).format(`H[h] m[m]`));

export const formatCommentTime = (date) => {
  return moment.duration(moment().diff(moment(date))).humanize();
};

