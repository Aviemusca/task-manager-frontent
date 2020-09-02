import React from "react";
import { StyledCard } from "../common/styles";
import { CardDates } from "../common/dates";
import { ProgressBar } from "../common/progressBar";
import { Card, Grid, Segment, Label, Popup } from "semantic-ui-react";
import styled from "styled-components";
import { GroupsContext } from "../contexts/GroupsContext";
import { TasksContext } from "../contexts/TasksContext";
import { taskStatuses, taskDeadlines } from "../../taskOptions";

const StyledHeader = styled(StyledCard)`
  width: 70%;
  margin: 2em 0;
  padding: 0;
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
      taskNums={[getNumTasks(2), getNumTasks(1), getNumTasks(0)]}
    />
  );
};

const Extras = ({ tasks, taskNums }) => {
  return (
    <React.Fragment>
      <ProgressBar items={tasks} />
      <Grid columns={3}>
        <Grid.Column>
          <Segment raised>
            <Label as="a" size="large" ribbon>
              Tasks
            </Label>
            <Label.Group circular size="big">
              {taskStatuses
                .slice(0)
                .reverse()
                .map((status, index) => {
                  return (
                    <Popup
                      content={status.popupContent}
                      trigger={
                        <Label color={status.color} as="a">
                          {taskNums[index]}
                        </Label>
                      }
                    />
                  );
                })}
            </Label.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};
export default Header;
