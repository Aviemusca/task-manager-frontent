import React from "react";
import { TasksContext } from "../contexts/TasksContext";
import {
  Dropdown,
  Icon,
  Checkbox,
  Button,
  Popup,
  Table,
} from "semantic-ui-react";
import styled from "styled-components";
import uuid from "react-uuid";
import { TableRowToggle } from "../common/buttons";
import sortOptions from "./sortOptions";

const arraySort = require("array-sort");

const StyledTableTitle = styled.h2`
  text-align: center;
  font-weight: 900;
  width: 25%;
  margin: 1em auto;
`;
const SortTableContainer = ({ sortProps, setSortProps }) => {
  const { projectTasks, setProjectTasks } = React.useContext(TasksContext);

  const handlers = {
    // Adding a new sortProp/table row
    addSortProp() {
      const newSortProps = [...sortProps];
      newSortProps.push(sortOptions[0]);
      setSortProps(newSortProps);
    },
    // Removing a sortProp/table row
    removeSortProp(row) {
      setSortProps(sortProps.filter((item, index) => index !== row));
    },

    sortChange(row, taskProp) {
      const newSortProp = sortOptions.find((item) => item.prop === taskProp);
      const newSortProps = [...sortProps];
      newSortProps[row] = newSortProp;
      setSortProps(newSortProps);
    },
    reverseToggle(row) {
      const newSortProps = [...sortProps];
      newSortProps[row].reverse = !newSortProps[row].reverse;
      setSortProps(newSortProps);
    },
    sortTasks() {
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
    },
  };

  return <SortTable sortProps={sortProps} handlers={handlers} />;
};

const SortTable = ({ sortProps, handlers }) => {
  return (
    <React.Fragment>
      <StyledTableTitle>Task Sort Widget</StyledTableTitle>
      <Table definition celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Task Property</Table.HeaderCell>
            <Table.HeaderCell>Sort Direction</Table.HeaderCell>
            <Table.HeaderCell>Toggle Direction</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortProps.map((item, index) => (
            <SortRow
              key={uuid()}
              sortProp={item}
              row={index}
              handleSortChange={handlers.sortChange}
              handleReverseToggle={handlers.reverseToggle}
              handleRemoveSortProp={handlers.removeSortProp}
            />
          ))}
        </Table.Body>
      </Table>
      <Buttons
        handleAddSortProp={handlers.addSortProp}
        handleSort={handlers.sortTasks}
      />
    </React.Fragment>
  );
};

const Buttons = ({ handleAddSortProp, handleSort }) => {
  return (
    <React.Fragment>
      <Popup
        content="Add Sort By Task Property"
        trigger={
          <Button icon background="transparent" onClick={handleAddSortProp}>
            <Icon name="plus" />
          </Button>
        }
      />
      <Button primary onClick={handleSort}>
        Sort
      </Button>
    </React.Fragment>
  );
};
const SortRow = ({
  sortProp,
  row,
  handleSortChange,
  handleReverseToggle,
  handleRemoveSortProp,
}) => {
  const [rowName, setRowName] = React.useState("");
  const { name, defaultFirst, defaultLast, reverse } = sortProp;
  const sortByPopup = [
    "Sort by 1st property",
    "When 1st properties are equal, sort by 2nd property",
    "When 1st and 2nd properties are equal, sort by 3rd property",
    "When 1st, 2nd and 3rd properties are equal, sort by 4th property",
  ];
  React.useEffect(() => {
    row === 0 ? setRowName("Sort By") : setRowName("Then By");
  }, []);

  return (
    <Table.Row>
      <Popup
        content={sortByPopup[row]}
        trigger={<Table.Cell>{rowName}</Table.Cell>}
      />
      <Table.Cell>
        <DropDownWidget
          value={name}
          row={row}
          handleChange={handleSortChange}
        />{" "}
      </Table.Cell>
      <Table.Cell>
        <SortDirection
          defaultFirst={defaultFirst}
          defaultLast={defaultLast}
          reversed={reverse}
        />
      </Table.Cell>
      <Table.Cell>
        <TableRowToggle
          row={row}
          checked={reverse}
          handleChange={handleReverseToggle}
        />
      </Table.Cell>
      <Table.Cell>
        <Button
          icon
          size="small"
          background="transparent"
          circular
          onClick={() => handleRemoveSortProp(row)}
        >
          <Icon name="delete" color="red" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};
const DropDownWidget = ({ value, row, handleChange }) => {
  const options = sortOptions.map((item, index) => {
    return { key: index, text: item.name, value: item.prop };
  });

  return (
    <Dropdown
      selection
      placeholder={value}
      options={options}
      onChange={(event, { value }) => handleChange(row, value)}
    />
  );
};

const SortDirection = ({ defaultFirst, defaultLast, reversed }) => {
  return !reversed ? (
    <div>
      {defaultFirst}
      <Icon name="right arrow" />
      {defaultLast}
    </div>
  ) : (
    <div>
      {defaultLast}
      <Icon name="right arrow" />
      {defaultFirst}
    </div>
  );
};

export default SortTableContainer;
