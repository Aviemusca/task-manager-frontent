import React from "react";
import { ProjectsContext } from "../contexts/ProjectsContext";

import ProjectCardList from "./ProjectCardList";

const ProjectsViewContainer = (props) => {
  const { projects, setProjects, fetchProjects } = React.useContext(
    ProjectsContext
  );

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return <ProjectCardList projects={projects} />;
};

export default ProjectsViewContainer;
