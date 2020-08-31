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
    name: "Date Created",
    defaultFirst: "Old",
    defaultLast: "New",
    prop: "dateCreated",
    compareFunc: compareDates,
    reverse: false,
  },
  {
    name: "Deadline",
    defaultFirst: "Old",
    defaultLast: "New",
    prop: "deadline",
    compareFunc: compareDates,
    reverse: false,
  },
  {
    name: "Priority",
    defaultFirst: "Low",
    defaultLast: "High",
    prop: "priority",
    compareFunc: compareNumbers,
    reverse: false,
  },
  {
    name: "Difficulty",
    defaultFirst: "Low",
    defaultLast: "High",
    prop: "difficulty",
    compareFunc: compareNumbers,
    reverse: false,
  },
];

export default sortOptions;
