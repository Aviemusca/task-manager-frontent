import React from "react";
import { StyledCard, StyledLabel } from "../common/styles";
import { CardDates } from "../common/dates";
import { ProgressBar } from "../common/progressBar";
import { Card, Grid, Segment, Label, Popup } from "semantic-ui-react";
import styled from "styled-components";
import { GroupsContext } from "../contexts/GroupsContext";
import { TasksContext } from "../contexts/TasksContext";
import { taskStatuses, taskDeadlines } from "../../taskOptions";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
  flex-flow: row wrap;
  margin-top: 2em;
  margin-bottom: 6em;
  padding: 0;
`;
const StyledHeaderBox = styled.div`
  width: 30%;
  margin-right: 2em;
`;

const Header = ({ project }) => {
  const { groups } = React.useContext(GroupsContext);
  const { projectTasks } = React.useContext(TasksContext);

  return (
    <StyledHeader>
      <StyledHeaderBox>
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
        />
      </StyledHeaderBox>
      <StyledHeaderBox>
        <ProgressCard projectTasks={projectTasks} />

        <TaskInfoContainer tasks={projectTasks} />
      </StyledHeaderBox>
    </StyledHeader>
  );
};

const ProgressCard = ({ projectTasks }) => (
  <Card
    fluid
    header="Project Tasks Complete"
    description={<ProgressBar items={projectTasks} />}
  />
);
const TaskInfoContainer = ({ tasks }) => {
  const getNumTasks = (state) =>
    tasks.reduce(
      (total, task) => (task.state === state ? total + 1 : total),
      0
    );

  return (
    <TaskInfo
      tasks={tasks}
      taskNums={[getNumTasks(2), getNumTasks(1), getNumTasks(0)]}
    />
  );
};
const TaskInfo = ({ tasks, taskNums }) => {
  return (
    <LabelBox title="Tasks" style={{ display: "inline-block" }}>
      <NumberLabel popup="Total" number={tasks.length} />
      {taskStatuses
        .slice(0)
        .reverse()
        .map((status, index) => {
          return (
            <NumberLabel
              popup={status.popupContent}
              color={status.color}
              number={taskNums[index]}
            />
          );
        })}
    </LabelBox>
  );
};
const GroupInfoContainer = ({ groups, tasks }) => {
  const getGroupStatuses = () => {
    const statuses = groups.map((group) => getStatus(group));
    return [
      statuses.filter((item) => item === 0).length,
      statuses.filter((item) => item === 1).length,
      statuses.filter((item) => item === 2).length,
    ];
  };
  const getStatus = (group) => {
    const groupTasks = tasks.filter((task) => (task.groupId = group.id));
    // All tasks complete, then group complete
    if (getNum(groupTasks, 2).length === groupTasks.length) return 2;
    // All tasks not started, then group not started
    if (getNum(groupTasks, 0).length === 0) return 0;
    // Else in Progress
    return 1;
  };

  const getNum = (tasks, state) => tasks.filter((task) => task.state === state);
  return <GroupInfo groups={groups} groupNums={getGroupStatuses()} />;
};
const GroupInfo = ({ groups, groupNums }) => {
  return (
    <LabelBox title="Task Groups">
      <NumberLabel popup="Total" number={groups.length} />
      {taskStatuses
        .slice(0)
        .reverse()
        .map((status, index) => {
          return (
            <NumberLabel
              popup={status.popupContent}
              color={status.color}
              number={groupNums[index]}
            />
          );
        })}
    </LabelBox>
  );
};

const LabelBox = ({ title, children }) => (
  <Segment raised>
    <Label as="a" size="large" ribbon>
      {title}
    </Label>
    <Label.Group circular size="big">
      {children}
    </Label.Group>
  </Segment>
);

const NumberLabel = ({ popup, color, number }) => (
  <Popup
    content={popup}
    trigger={
      <Label color={color} as="a">
        {number}
      </Label>
    }
  />
);

export default Header;
