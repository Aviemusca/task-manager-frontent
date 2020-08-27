const formatDateToString = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toDateString();
};

const formatTimeToString = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toTimeString();
};

export { formatDateToString, formatTimeToString };
