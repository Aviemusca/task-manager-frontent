import React from "react";
import { replaceItem } from "../../utils/arrays";
import filterOptions from "../project/filterOptions";

const FiltersContext = React.createContext();

function FiltersProvider(props) {
  // Provider for the task groups of a given project
  const [filterProps, setFilterProps] = React.useState(
    JSON.parse(JSON.stringify(filterOptions))
  );

  const filterTasks = (tasks) => {
    filterProps.forEach((filter) => {
      if (filter.checked) {
        if (filter.prop === "state") {
          tasks = filterByStatus(tasks);
        } else {
          tasks = tasks.filter(
            (task) =>
              task[filter.prop] >= filter.minMax[0] &&
              task[filter.prop] <= filter.minMax[1]
          );
        }
      }
    });
    return tasks;
  };
  const filterByStatus = (tasks) => {
    const [statusFilter] = utils.getFilterPropData("state");
    const statusProps = Object.keys(statusFilter.checkboxes);
    const statusChecks = Object.values(statusFilter.checkboxes);
    statusProps.forEach((status, index) => {
      if (statusChecks[index])
        tasks = tasks.filter((task) => task.state === index);
    });
    return tasks;
  };

  const utils = {
    // utility functions
    getFilterPropData(taskProp) {
      // Returns the filterProp data for a given taskProp
      const filterProp = filterProps.find((item) => item.prop === taskProp);
      const filterPropIndex = filterProps.indexOf(filterProp);
      return [filterProp, filterPropIndex];
    },
    validateMinMax(filterPropIndex, minMax) {
      // If provided min/max are blank -> return default value
      const newMinMax = [...minMax];
      minMax.forEach((item, index) => {
        if (!item)
          newMinMax[index] = filterOptions[filterPropIndex].minMax[index];
      });
      return newMinMax;
    },
    updateFilterProps(newFilterProp, filterPropIndex) {
      const newFilterProps = [...filterProps];
      replaceItem(newFilterProps, newFilterProp, filterPropIndex);
      setFilterProps(newFilterProps);
    },
  };
  return (
    <FiltersContext.Provider
      value={{
        filterProps,
        setFilterProps,
        filterTasks,
        utils,
      }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
}

export { FiltersContext, FiltersProvider };
