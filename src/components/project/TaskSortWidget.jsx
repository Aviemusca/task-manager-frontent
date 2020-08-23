import React from "react";
import { TasksContext } from "../contexts/TasksContext";
import { Dropdown, Menu } from "semantic-ui-react";

const arraySort = require("array-sort");

const compareNumbers = (prop, direction) => (a, b) =>
  !direction.reverse ? a[prop] - b[prop] : b[prop] - a[prop];

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

const TaskSortWidgetContainer = ({ project }) => {
  const { projectTasks, setProjectTasks } = React.useContext(TasksContext);
  const [sortProps, setSortProps] = React.useState(
    sortOptions.map((item, index) => {
      return item;
    })
  );
  const [sortByIndices, setSortByIndices] = React.useState(
    sortOptions.map((item) => 0)
  );
  React.useEffect(() => {
    sortProjectTasks();
  }, [...projectTasks.map((item) => item.priority)]);

  async function handleSortChange(widget, sortByIndex) {
    const newSortByIndices = [...sortByIndices];
    newSortByIndices[widget] = sortByIndex;
    await setSortByIndices(newSortByIndices);
    await setSortProps(
      sortOptions.map((item, index, array) => array[sortByIndices[index]])
    );
    sortProjectTasks();
  }

  const sortProjectTasks = () => {
    const newTasks = [...projectTasks];
    arraySort(
      newTasks,
      sortProps.map((sortProp) => {
        return sortProp.compareFunc(sortProp.prop, {
          reverse: sortProp.reverse,
        });
      })
    );
    setProjectTasks(newTasks);
  };
  return sortProps.map((item, index) => (
    <DropDownWidget
      values={sortOptions.map((item) => item.formParams.name)}
      currentIndex={sortByIndices[index]}
      onIndexChange={handleSortChange}
      currentWidget={index}
    />
  ));
};

const DropDownWidget = ({
  values,
  currentIndex,
  currentWidget,
  onIndexChange,
}) => {
  return (
    <Menu compact>
      <Dropdown item simple text={values[currentIndex]}>
        <Dropdown.Menu>
          {values.map((value, index) => {
            return (
              <Dropdown.Item
                onClick={() => onIndexChange(currentWidget, index)}
              >
                {value}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default TaskSortWidgetContainer;
