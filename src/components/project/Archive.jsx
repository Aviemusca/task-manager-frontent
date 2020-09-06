import React from "react";
import { Popup, Icon, Button, Modal, Label } from "semantic-ui-react";
import styled from "styled-components";
import { TasksContext } from "../contexts/TasksContext";
import { TaskList } from "./TaskList";
import { StyledCard, StyledHeader, StyledTitle } from "../common/styles";

const StyledArchiveTitle = styled(StyledTitle)`
  color: #777;
`;
const ArchiveContainer = (props) => {
  const { projectTasks } = React.useContext(TasksContext);

  return (
    <StyledCard style={{ marginTop: "2em" }}>
      <Header />
      <TaskList
        tasks={projectTasks.filter((task) => task.archived)}
        initialTasksShown={0}
      />
    </StyledCard>
  );
};

const Header = (props) => {
  return (
    <StyledHeader>
      <StyledArchiveTitle>Archive</StyledArchiveTitle>
    </StyledHeader>
  );
};

export default ArchiveContainer;
