import React from "react";

import { Header, HeaderTitle } from "./ProjectStyles";
import { Button, Modal } from "semantic-ui-react";
import { ProjectForm } from "./ProjectForm";
import axios from "axios";

const ProjectsViewHeader = ({ handleAddProject }) => {
  return (
    <Header>
      <HeaderTitle>My Projects</HeaderTitle>
      <Button
        onClick={handleAddProject}
        basic
        color="violet"
        content="Add project"
      />
    </Header>
  );
};

export default ProjectsViewHeader;
