import React from "react";
import styled from "styled-components";
import { Dropdown, Menu } from "semantic-ui-react";
import { TasksContext } from "../contexts/TasksContext";
import { SideBarTaskList } from "./TaskList";

const Container = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

const Title = styled.h2`
  padding: 0.5em 1em;
  text-align: center;
`;

const ProjectSideBar = ({ project }) => {
  return (
    <Container>
      <Title>Task Manager</Title>
      Order by <TaskOrderWidgetContainer project={project} />
      <SideBarTaskList project={project} />
    </Container>
  );
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
export default ProjectSideBar;
