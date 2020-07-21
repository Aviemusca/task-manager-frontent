import React from "react";

import ProjectsViewHeader from "./ProjectsViewHeader";
import ProjectCardList from "./ProjectCardList";

function ProjectsView(props) {
  return (
    <React.Fragment>
      <ProjectsViewHeader />
      <ProjectCardList />
    </React.Fragment>
  );
}

export default ProjectsView;
