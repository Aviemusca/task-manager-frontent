import React, { Component } from "react";

import ProjectCard from "./ProjectCard";

import { CardGrid } from "./ProjectStyles";

const ProjectCardList = ({ projects }) => {
  return (
    <CardGrid>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          dateCreated={project.dateCreated}
          title={project.title}
          description={project.description}
        />
      ))}
    </CardGrid>
  );
};

export default ProjectCardList;
