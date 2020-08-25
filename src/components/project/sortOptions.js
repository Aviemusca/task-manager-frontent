// Sort compare function for numbers
const compareNumbers = (prop, direction) => (a, b) =>
  !direction.reverse ? a[prop] - b[prop] : b[prop] - a[prop];

// Sort compare function for dates
const compareDates = (prop, direction) => (a, b) =>
  !direction.reverse
    ? new Date(a[prop]) - new Date(b[prop])
    : new Date(b[prop]) - new Date(a[prop]);

const sortOptions = [
  {
    formParams: {
      name: "Date Created",
      defaultFirst: "Old",
      defaultLast: "New",
    },
    prop: "dateCreated",
    compareFunc: compareDates,
    reverse: false,
  },
  {
    formParams: {
      name: "Priority",
      defaultFirst: "Low",
      defaultLast: "High",
    },
    prop: "priority",
    compareFunc: compareNumbers,
    reverse: false,
  },
  {
    formParams: {
      name: "Difficulty",
      defaultFirst: "Easy",
      defaultLast: "Challenging",
    },
    prop: "difficulty",
    compareFunc: compareNumbers,
    reverse: false,
  },
  {
    formParams: {
      name: "Deadline",
      defaultFirst: "Soon",
      defaultLast: "Later",
    },
    prop: "deadline",
    compareFunc: compareDates,
    reverse: false,
  },
];

export default sortOptions;
