import React from "react";

import { ProjectTitle } from "./Styles";
import { Button } from "semantic-ui-react";

const Header = ({ project, onDeleteProject, onAddGroup }) => {
  const { title } = project;
  console.log(project);
  return (
    <React.Fragment>
      <ProjectTitle>{title}</ProjectTitle>
      <Button primary onClick={onAddGroup}>
        Add Task Group
      </Button>
      <Button primary onClick={(event) => onDeleteProject(event)}>
        Delete Project
      </Button>
    </React.Fragment>
  );
};

export default Header;
