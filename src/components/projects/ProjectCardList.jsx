import React from "react";

import ProjectCard from "./ProjectCard";

import { CardGrid } from "./ProjectStyles";

const ProjectCardList = ({ projects }) => {
  return (
    <CardGrid>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </CardGrid>
  );
};

export default ProjectCardList;
