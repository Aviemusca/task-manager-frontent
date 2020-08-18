const formatDateToString = (date) => {
  const formattedDate = new Date(date);
  return formattedDate.toDateString();
};

export { formatDateToString };
