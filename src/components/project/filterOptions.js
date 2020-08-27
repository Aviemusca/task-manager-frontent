import { add as addDate, sub as subDate } from "date-fns";

const filterOptions = [
  {
    params: {
      name: "Status",
      notStartedChecked: false,
      inProgressChecked: false,
      completedChecked: false,
    },
    prop: "state",
    checked: false,
  },
  {
    params: {
      name: "Deadline",
      minMax: [new Date(), addDate(new Date(), { months: 1 })],
    },
    prop: "deadline",
    checked: false,
  },
  {
    params: {
      name: "Priority",
      minMax: [1, 10],
    },
    prop: "priority",
    checked: false,
  },
  {
    params: {
      name: "Difficulty",
      minMax: [1, 10],
    },
    prop: "difficulty",
    checked: false,
  },
  {
    params: {
      name: "Date Created",
      minMax: [
        subDate(new Date(), { months: 1 }),
        addDate(new Date(), { months: 1 }),
      ],
    },
    prop: "dateCreated",
    checked: false,
  },
];

export default filterOptions;
