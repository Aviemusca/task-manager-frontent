import React, { useContext } from "react";

import ProjectCard from "./ProjectCard";

import { CardGrid } from "./ProjectStyles";
import { ProjectsContext } from "../contexts/ProjectsContext";

const ProjectCardList = () => {
  const { projects } = useContext(ProjectsContext);
  return (
    <CardGrid>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </CardGrid>
  );
};

export default ProjectCardList;
