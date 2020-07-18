import React from "react";

import { SideBarContainer, SideBarTitle } from "./Styles";
const ProjectSideBar = ({ project }) => {
  return (
    <SideBarContainer>
      <SideBarTitle>{project.title}</SideBarTitle>
    </SideBarContainer>
  );
};

export default ProjectSideBar;
