const axiosOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem(
      "taskManagerAuthenticationToken"
    )}`,
  },
};

export default axiosOptions;
