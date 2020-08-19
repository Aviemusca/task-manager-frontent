import React from "react";
import styled from "styled-components";
import { Dropdown, Menu, Button, Icon } from "semantic-ui-react";
import { TasksContext } from "../contexts/TasksContext";
import { ProgressBar } from "../common/progressBar";
import { SideBarTaskList } from "./TaskList";

const StyledCard = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
  padding: 1em;
  &:hover {
    box-shadow: 8px 6px 0px 0 rgba(0, 0, 0, 0.3),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #bbb;
`;

const StyledTitle = styled.h2`
  width: 60%;
  margin-bottom: 0;
`;

const SideBarContainer = ({ project }) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [addGroupMode, setAddGroupMode] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);

  const state = {
    modes: {
      addGroupMode,
      editMode,
      deleteMode,
    },
    showOptions,
    project,
  };

  const setState = {
    setModes: {
      setAddGroupMode,
      setEditMode,
      setDeleteMode,
    },
    setShowOptions,
  };
  return <SideBar state={state} setState={setState} />;
};
const SideBar = ({ state, setState }) => {
  const { project } = state;
  const { setShowOptions } = setState;
  const { setAddGroupMode } = setState.setModes;

  return (
    <StyledCard
      onMouseOver={() => setShowOptions(true)}
      onMouseLeave={() => {
        setShowOptions(false);
        setAddGroupMode(false);
      }}
    >
      <StyledTitle>Project Manager</StyledTitle>
      <ProjectProgressBar />
      Order by <TaskOrderWidgetContainer project={project} />
      <SideBarTaskList project={project} />
    </StyledCard>
  );
};

const ProjectProgressBar = () => {
  const { projectTasks } = React.useContext(TasksContext);
  return <ProgressBar items={projectTasks} />;
};

const TaskOrderWidgetContainer = ({ project }) => {
  const taskOrders = [
    "Date Created (old-new)",
    "Date Created (new-old)",
    "Priority (high-low)",
    "Priority (low-high)",
    "Difficulty (easy-hard)",
    "Difficulty (hard-easy)",
    "Deadline (soon-later)",
    "Deadline (later-soon)",
  ];

  const { projectTasks, setProjectTasks } = React.useContext(TasksContext);
  const [orderIndex, setOrderIndex] = React.useState(0);

  const handleOrderChange = (newOrderIndex) => {
    setOrderIndex(newOrderIndex);
    orderProjectTasks(newOrderIndex);
  };
  const orderProjectTasks = (taskOrder) => {
    const newTasks = [...projectTasks];
    switch (taskOrder) {
      case 0:
        newTasks.sort(
          (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
        );
        break;
      case 1:
        newTasks.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );
        break;
      case 2:
        newTasks.sort((a, b) => b.priority - a.priority);
        break;
      case 3:
        newTasks.sort((a, b) => a.priority - b.priority);
        break;
      case 4:
        newTasks.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case 5:
        newTasks.sort((a, b) => b.difficulty - a.difficulty);
        break;
      case 6:
        newTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 7:
        newTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        break;
      default:
        throw new Error(`Task order ${taskOrder} not recognized.`);
    }
    setProjectTasks(newTasks);
  };
  return (
    <DropDownWidget
      values={taskOrders}
      currentIndex={orderIndex}
      onIndexChange={handleOrderChange}
    />
  );
};

const DropDownWidget = ({ values, currentIndex, onIndexChange }) => {
  return (
    <Menu compact>
      <Dropdown item simple text={values[currentIndex]}>
        <Dropdown.Menu>
          {values.map((value, index) => {
            return (
              <Dropdown.Item onClick={() => onIndexChange(index)}>
                {value}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};
export default SideBarContainer;
