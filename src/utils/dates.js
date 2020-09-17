const formatDateToString = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toDateString();
};

const formatTimeToString = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toTimeString();
};

const getNonOffsetNewDate = (date) => {
  date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
  return date;
};

export { formatDateToString, formatTimeToString, getNonOffsetNewDate };
