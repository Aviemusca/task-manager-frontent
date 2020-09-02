import React from "react";
import { Table, Checkbox, Label, Input } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import styled from "styled-components";
import { Slider } from "react-semantic-ui-range";
import { TasksContext } from "../contexts/TasksContext";
import { TableRowToggle } from "../common/buttons";
import { StyledTableTitle } from "../common/styles";
import filterOptions from "./filterOptions";
import { replaceItem } from "../../utils/arrays";

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledInput = styled(Input)`
  display: inline-block;
  padding: 0 1em;
`;
const StyledSlider = styled(Slider)`
  width: 80%;
`;
const FilterTableContainer = ({ filterProps, setFilterProps }) => {
  const { projectTasks, setManagerTasks } = React.useContext(TasksContext);

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

  const filterTasks = () => {
    let tasks = [...projectTasks];
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
    setManagerTasks(tasks);
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

  const handlers = {
    // All onChange event handlers for the task filter widget
    toggleChange(row) {
      // Switching filters on/off
      const newFilterProps = [...filterProps];
      newFilterProps[row].checked = !newFilterProps[row].checked;
      setFilterProps(newFilterProps);
    },
    minMaxChange(taskProp, newMinMax) {
      // Handling changes in min/max filter values
      const [newFilterProp, filterPropIndex] = utils.getFilterPropData(
        taskProp
      );
      newMinMax = utils.validateMinMax(filterPropIndex, newMinMax);
      newFilterProp.minMax = newMinMax;
      utils.updateFilterProps(newFilterProp, filterPropIndex);
    },
    statusChange(status) {
      // Handling changes in task status
      const [newFilterProp, filterPropIndex] = utils.getFilterPropData("state");
      newFilterProp.checkboxes[status] = !newFilterProp.checkboxes[status];
      utils.updateFilterProps(newFilterProp, filterPropIndex);
    },
  };

  React.useEffect(() => {
    filterTasks();
  }, [JSON.stringify(filterProps)]);

  // Have filter switch turn on automatically when option changes
  return <FilterTable filterProps={filterProps} handlers={handlers} />;
};

const FilterTable = ({ filterProps, handlers }) => {
  return (
    <React.Fragment>
      <StyledTableTitle>Task Filter Widget</StyledTableTitle>
      <Table definition celled padded textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Filter On</Table.HeaderCell>
            <Table.HeaderCell>Options</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filterProps.map((item, index) => (
            <TableRow
              key={index}
              row={index}
              title={item.name}
              filterOn={item.checked}
              handleToggleChange={handlers.toggleChange}
            >
              {getOptionCell(item, handlers)}
            </TableRow>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

const getOptionCell = (item, handlers) => {
  const { statusChange, minMaxChange } = handlers;
  switch (item.prop) {
    case "state":
      return getStatusCell(item, statusChange);
    case "deadline":
      return getDeadlineCell(item, minMaxChange);
    case "priority":
      return getPriorityCell(item, minMaxChange);
    case "difficulty":
      return getDifficultyCell(item, minMaxChange);
    case "dateCreated":
      return getDateCreatedCell(item, minMaxChange);
    default:
      throw new Error(`Filter prop ${item.prop} not recognized`);
  }
};

const getDeadlineCell = (item, handleChange) => {
  const { minMax } = item;
  return (
    <DateCell taskProp="deadline" minMax={minMax} handleChange={handleChange} />
  );
};

const getDateCreatedCell = (item, handleChange) => {
  const { minMax } = item;
  return (
    <DateCell
      taskProp="dateCreated"
      minMax={minMax}
      handleChange={handleChange}
    />
  );
};

const getStatusCell = (item, handleChange) => {
  const { checkboxes } = item;
  return <StatusCell checkboxes={checkboxes} handleChange={handleChange} />;
};
const getDifficultyCell = (item, handleChange) => {
  const { minMax } = item;
  return (
    <DoubleSliderCell
      taskProp="difficulty"
      minMax={minMax}
      handleChange={handleChange}
    />
  );
};
const getPriorityCell = (item, handleChange) => {
  const { minMax } = item;
  return (
    <DoubleSliderCell
      taskProp="priority"
      minMax={minMax}
      handleChange={handleChange}
    />
  );
};

const TableRow = (props) => {
  const { title, filterOn, row, handleToggleChange } = props;
  return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <TableRowToggle
        row={row}
        checked={filterOn}
        handleChange={() => handleToggleChange(row)}
      />
      <Table.Cell>{props.children}</Table.Cell>
    </Table.Row>
  );
};

const StatusCell = ({ checkboxes, handleChange }) => {
  const { notStarted, inProgress, completed } = checkboxes;
  return (
    <CheckBoxWrapper>
      <Checkbox
        label="Not Started"
        checked={notStarted}
        onChange={() => handleChange("notStarted")}
      />
      <Checkbox
        label="In Progress"
        checked={inProgress}
        onChange={() => handleChange("inProgress")}
      />
      <Checkbox
        label="Completed"
        checked={completed}
        onChange={() => handleChange("completed")}
      />
    </CheckBoxWrapper>
  );
};

const DoubleSliderCell = ({ taskProp, minMax, handleChange }) => {
  const sliderSettings = {
    start: [1, 10],
    min: 1,
    max: 10,
    step: 1,
    onChange: (value) => {
      handleChange(taskProp, value);
    },
  };

  return (
    <React.Fragment>
      <StyledSlider
        multiple
        discrete
        value={minMax}
        color="blue"
        settings={sliderSettings}
      />
      <Label color="blue">{minMax[0]}</Label>
      <StyledInput
        placeholder="Enter minimum"
        onChange={(event) =>
          handleChange(taskProp, [event.target.value, minMax[1]])
        }
      />
      <StyledInput
        placeholder="Enter maximum"
        onChange={(event) =>
          handleChange(taskProp, [minMax[0], event.target.value])
        }
      />
      <Label color="blue">{minMax[1]}</Label>
    </React.Fragment>
  );
};
const DateCell = ({ taskProp, minMax, handleChange }) => {
  return (
    <React.Fragment>
      <DateTimeInput
        label="Earliest"
        iconPosition="left"
        dateFormat="YYYY-MM-DD"
        timeFormat="24"
        placeholder="Earliest"
        value={minMax[0]}
        onChange={(event, { name, value }) =>
          handleChange(taskProp, [value, minMax[1]])
        }
      />
      <DateTimeInput
        label="Latest"
        iconPosition="left"
        dateFormat="YYYY-MM-DD"
        timeFormat="24"
        placeholder="Latest"
        value={minMax[1]}
        onChange={(event, { name, value }) =>
          handleChange(taskProp, [minMax[0], value])
        }
      />
    </React.Fragment>
  );
};
export default FilterTableContainer;
