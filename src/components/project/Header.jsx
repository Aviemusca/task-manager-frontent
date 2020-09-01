import React from "react";
import { StyledCard } from "../common/styles";
import { CardDates } from "../common/dates";
import { ProgressBar } from "../common/progressBar";
import { Card, Label, Popup } from "semantic-ui-react";
import styled from "styled-components";
import { GroupsContext } from "../contexts/GroupsContext";
import { TasksContext } from "../contexts/TasksContext";
import { taskStatuses, taskDeadlines } from "../../taskOptions";

const StyledHeader = styled(StyledCard)`
  width: 70%;
  margin: 2em 0;
  padding: 0;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-colums: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const Header = ({ project }) => {
  const { groups } = React.useContext(GroupsContext);
  const { projectTasks } = React.useContext(TasksContext);

  return (
    <StyledHeader>
      <Card
        fluid
        header={<h1>{project.title}</h1>}
        description={project.description}
        meta={
          <CardDates
            dateCreated={project.dateCreated}
            deadline={project.deadline}
          />
        }
        extra={<ExtrasContainer tasks={projectTasks} />}
      />
    </StyledHeader>
  );
};

const ExtrasContainer = ({ tasks }) => {
  const getNumTasks = (state) =>
    tasks.reduce(
      (total, task) => (task.state === state ? total + 1 : total),
      0
    );

  return (
    <Extras
      tasks={tasks}
      notStarted={getNumTasks(0)}
      inProgress={getNumTasks(1)}
      completed={getNumTasks(2)}
    />
  );
};

const Extras = ({ tasks, completed, inProgress, notStarted }) => {
  return (
    <React.Fragment>
      <ProgressBar items={tasks} />
      <Label.Group circular size="huge">
        <Popup
          content="Tasks Completed"
          trigger={
            <Label color={taskStatuses[2].color} as="a">
              {completed}
            </Label>
          }
        />
        <Popup
          content="Tasks In Progress"
          trigger={
            <Label color={taskStatuses[1].color} as="a">
              {inProgress}
            </Label>
          }
        />
        <Popup
          content="Tasks Not Started"
          trigger={
            <Label color={taskStatuses[0].color} as="a">
              {notStarted}
            </Label>
          }
        />
      </Label.Group>
    </React.Fragment>
  );
};
export default Header;
