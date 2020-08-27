import React from "react";
import { Table, Checkbox, Label, Input } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import styled from "styled-components";
import { Slider } from "react-semantic-ui-range";
import { TasksContext } from "../contexts/TasksContext";
import { TableRowToggle } from "../common/buttons";
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
  const { projectTasks, setProjectTasks } = React.useContext(TasksContext);

  const getFilterPropData = (taskProp) => {
    const filterProp = filterProps.find((item) => item.prop === taskProp);
    const filterPropIndex = filterProps.indexOf(filterProp);
    return [filterProp, filterPropIndex];
  };

  const validateMinMax = (filterPropIndex, minMax) => {
    // If min/max blank -> return default value
    const newMinMax = [...minMax];
    minMax.forEach((item, index) => {
      if (!item)
        newMinMax[index] = filterOptions[filterPropIndex].params.minMax[index];
    });
    return newMinMax;
  };
  const handlers = {
    // Switching filters on/off
    toggleChange(row) {
      const newFilterProps = [...filterProps];
      newFilterProps[row].checked = !newFilterProps[row].checked;
      setFilterProps(newFilterProps);
    },
    // Handling changes in min/max filter values
    minMaxChange(taskProp, newMinMax) {
      const [newFilterProp, filterPropIndex] = getFilterPropData(taskProp);
      newMinMax = validateMinMax(filterPropIndex, newMinMax);
      newFilterProp.params.minMax = newMinMax;
      const newFilterProps = [...filterProps];
      replaceItem(newFilterProps, newFilterProp, filterPropIndex);
      setFilterProps(newFilterProps);
    },
  };

  return <FilterTable filterProps={filterProps} handlers={handlers} />;
};

const FilterTable = ({ filterProps, handlers }) => {
  return (
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
            title={item.params.name}
            filterOn={item.checked}
            handleToggleChange={handlers.toggleChange}
          >
            {getOptionCell(item, handlers)}
          </TableRow>
        ))}
      </Table.Body>
    </Table>
  );
};

const getOptionCell = (item, handlers) => {
  switch (item.prop) {
    case "state":
      return getStatusCell(item);
    case "deadline":
      return getDeadlineCell(item, handlers.minMaxChange);
    case "priority":
      return getPriorityCell(item, handlers.minMaxChange);
    case "difficulty":
      return getDifficultyCell(item, handlers.minMaxChange);
    case "dateCreated":
      return getDateCreatedCell(item);

    default:
      throw new Error(`Filter prop ${item.prop} not recognized`);
  }
};

const getDeadlineCell = (item, handleChange) => {
  const { minMax } = item.params;
  return (
    <DateCell taskProp="deadline" minMax={minMax} handleChange={handleChange} />
  );
};

const getDateCreatedCell = (item) => {
  return;
};
const getStatusCell = (item) => {
  const {
    notStartedChecked,
    inProgressChecked,
    completedChecked,
  } = item.params;
  return (
    <StatusCell
      notStartedChecked={notStartedChecked}
      inProgressChecked={inProgressChecked}
      completedChecked={completedChecked}
    />
  );
};
const getDifficultyCell = (item, handleChange) => {
  const { minMax } = item.params;
  return (
    <DoubleSliderCell
      taskProp="difficulty"
      minMax={minMax}
      handleChange={handleChange}
    />
  );
};
const getPriorityCell = (item, handleChange) => {
  const { minMax } = item.params;
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

const StatusCell = ({
  notStartedChecked,
  inProgressChecked,
  completedChecked,
}) => {
  return (
    <CheckBoxWrapper>
      <Checkbox label="Not Started" checked={notStartedChecked} />
      <Checkbox label="In Progress" checked={inProgressChecked} />
      <Checkbox label="Completed" checked={completedChecked} />
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
    <DateTimeInput
      label="Deadline"
      name="deadline"
      iconPosition="left"
      dateFormat="YYYY-MM-DD"
      timeFormat="24"
      placeholder="Earliest"
      value={minMax[0]}
      onChange={(event) =>
        handleChange(taskProp, [event.target.value, minMax[1]])
      }
    />
  );
};
export default FilterTableContainer;
