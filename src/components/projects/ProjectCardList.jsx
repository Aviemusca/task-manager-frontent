import React, { useContext } from "react";
import styled from "styled-components";

import ProjectCard from "./ProjectCard";

import { CardGrid } from "./ProjectStyles";
import { ProjectsContext } from "../contexts/ProjectsContext";

const StyledTitle = styled.h2`
  padding: 1em 1em;
  text-align: center;
`;
const ProjectCardList = ({ projects }) => (
  <React.Fragment>
    {projects.length !== 0 ? (
      <CardGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CardGrid>
    ) : (
      <StyledTitle>You have no projects!</StyledTitle>
    )}
  </React.Fragment>
);

export default ProjectCardList;
