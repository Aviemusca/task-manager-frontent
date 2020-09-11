import React from "react";
import { StyledCard } from "../common/styles";
import { CardTitle, CardDescription } from "../projects/ProjectStyles";
import { CardDates } from "../common/dates";
import { ProgressBar } from "../common/progressBar";
import TaskInfo from "../common/taskInfo";
import { Popup } from "semantic-ui-react";
import styled from "styled-components";
import { TasksContext } from "../contexts/TasksContext";

const CardBodyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  width: 90%;
  margin: 0 auto;
  margin-top: 0.25em;
  justify-content: space-between;
`;

const StyledGridLeft = styled.div`
  border-right: #bbb solid 1px;
  padding: 2em 2em;
`;
const StyledGridRight = styled.div`
  margin-top: 0.5em;
  padding: 2em 2em;
`;

const Header = ({ project }) => {
  const { projectTasks: tasks } = React.useContext(TasksContext);
  const { title, dateCreated, deadline, description, slug } = project;
  return (
    <StyledCard>
      <CardTitle>{title}</CardTitle>

      <CardBodyGrid>
        <StyledGridLeft>
          <CardDates dateCreated={dateCreated} deadline={deadline} />{" "}
          <Popup
            content="Description"
            trigger={<CardDescription>{description}</CardDescription>}
          />
        </StyledGridLeft>
        <StyledGridRight>
          <Popup
            trigger={
              <div>
                <ProgressBar items={tasks} />
              </div>
            }
            content="Completed Tasks"
          />
          <TaskInfo tasks={tasks} bgColor="#4c4cd530" />
        </StyledGridRight>
      </CardBodyGrid>
    </StyledCard>
  );
};

export default Header;
