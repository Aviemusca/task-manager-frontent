import { add as addDate, sub as subDate, format as formatDate } from "date-fns";

const DATE_FORMAT = "yyyy-MM-dd HH:mm";

const filterOptions = [
  {
    name: "Status",
    minMax: [null, null],
    checkboxes: {
      notStarted: false,
      inProgress: false,
      completed: false,
    },
    prop: "state",
    checked: false,
  },
  {
    name: "Deadline",
    minMax: [
      formatDate(new Date(), DATE_FORMAT),
      formatDate(addDate(new Date(), { months: 1 }), DATE_FORMAT),
    ],
    prop: "deadline",
    checked: false,
  },
  {
    name: "Priority",
    minMax: [1, 10],
    prop: "priority",
    checked: false,
  },
  {
    name: "Difficulty",
    minMax: [1, 10],
    prop: "difficulty",
    checked: false,
  },
  {
    name: "Date Created",
    minMax: [
      formatDate(subDate(new Date(), { months: 1 }), DATE_FORMAT),
      formatDate(addDate(new Date(), { months: 1 }), DATE_FORMAT),
    ],
    prop: "dateCreated",
    checked: false,
  },
];

export default filterOptions;
