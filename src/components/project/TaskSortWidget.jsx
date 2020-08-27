import React from "react";
import { TasksContext } from "../contexts/TasksContext";
import { Dropdown, Icon, Checkbox, Popup, Table } from "semantic-ui-react";
import { TableRowToggle } from "../common/buttons";
import sortOptions from "./sortOptions";

const arraySort = require("array-sort");

const SortTableContainer = ({ sortPropIndices, setSortPropIndices }) => {
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

  const handleSortChange = (widget, sortPropIndex) => {
    const newSortPropIndices = [...sortPropIndices];
    newSortPropIndices[widget] = sortPropIndex;
    setSortPropIndices(newSortPropIndices);
  };

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
  return (
    <SortTable
      sortProps={sortProps}
      handleSortChange={handleSortChange}
      handleReverseToggle={handleReverseToggle}
    />
  );
};

const SortTable = ({ sortProps, handleSortChange, handleReverseToggle }) => {
  return (
    <Table definition celled textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Task Property</Table.HeaderCell>
          <Table.HeaderCell>Sort Direction</Table.HeaderCell>
          <Table.HeaderCell>Toggle Direction</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortProps.map((item, index) => (
          <SortRow
            key={index}
            sortProp={item}
            row={index}
            handleSortChange={handleSortChange}
            handleReverseToggle={handleReverseToggle}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const SortRow = ({ sortProp, row, handleSortChange, handleReverseToggle }) => {
  const [rowName, setRowName] = React.useState("");
  const { defaultFirst, defaultLast } = sortProp.formParams;
  const { reverse } = sortProp;
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
        <DropDownWidget row={row} handleChange={handleSortChange} />{" "}
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
    </Table.Row>
  );
};
const DropDownWidget = ({ row, handleChange }) => {
  const options = sortOptions.map((item, index) => {
    return { key: index, text: item.formParams.name, value: index };
  });

  return (
    <Dropdown
      selection
      placeholder={options[row].text}
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
