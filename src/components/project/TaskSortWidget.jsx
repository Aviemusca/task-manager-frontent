import React from "react";
import { TasksContext } from "../contexts/TasksContext";
import { Dropdown, Icon, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import sortOptions from "./sortOptions";

const StyledSortWidget = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledSortOrderToggle = styled.div`
  display: flex;
  justify-content: space-around;
`;
const arraySort = require("array-sort");

const SortWidgetsContainer = ({ sortPropIndices, setSortPropIndices }) => {
  const { projectTasks, setProjectTasks } = React.useContext(TasksContext);
  const [sortProps, setSortProps] = React.useState([]);

  React.useEffect(() => {
    setSortProps(
      sortOptions.map((item, index, array) => array[sortPropIndices[index]])
    );
  }, [JSON.stringify(sortPropIndices)]);

  React.useEffect(() => {
    sortProjectTasks();
  }, [JSON.stringify(sortProps)]);

  async function handleSortChange(widget, sortPropIndex) {
    const newSortPropIndices = [...sortPropIndices];
    newSortPropIndices[widget] = sortPropIndex;
    setSortPropIndices(newSortPropIndices);
  }

  const handleReverseToggle = (widget) => {
    const newSortProps = [...sortProps];
    newSortProps[widget].reverse = !newSortProps[widget].reverse;
    setSortProps(newSortProps);
  };

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
    <StyledSortWidget>
      <DropDownWidget currentWidget={index} handleChange={handleSortChange} />
      <OrderToggle
        defaultFirst={item.formParams.defaultFirst}
        defaultLast={item.formParams.defaultLast}
        reverse={item.reverse}
        handleChange={() => handleReverseToggle(index)}
      />
    </StyledSortWidget>
  ));
};

const DropDownWidget = ({ currentWidget, handleChange }) => {
  const options = sortOptions.map((item, index) => {
    return { key: index, text: item.formParams.name, value: index };
  });

  const placeholder = currentWidget === 0 ? "Sort By" : "Then By";
  return (
    <Dropdown
      selection
      placeholder={placeholder}
      options={options}
      onChange={(event, { value }) => handleChange(currentWidget, value)}
    />
  );
};

const OrderToggle = ({ defaultFirst, defaultLast, reverse, handleChange }) => {
  return (
    <StyledSortOrderToggle>
      <div>
        {defaultFirst}
        <Icon name="arrow right" />
        {defaultLast}
      </div>
      <Checkbox toggle checked={reverse} onChange={handleChange} />
      <div>
        {defaultLast}
        <Icon name="arrow right" />
        {defaultFirst}
      </div>
    </StyledSortOrderToggle>
  );
};
export default SortWidgetsContainer;
