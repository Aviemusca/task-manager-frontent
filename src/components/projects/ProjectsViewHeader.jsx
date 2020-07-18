import React from "react";

import { Header, HeaderTitle } from "./ProjectStyles";
import { Button } from "semantic-ui-react";

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
