import React from "react";
import { NavLink } from "react-router-dom";
import { CardTitle, CardSubTitle, CardDescription } from "./ProjectStyles";
import { StyledCard } from "../common/styles";

import routes from "../../routes";

const ProjectCard = ({ project }) => {
  const { title, dateCreated, description, slug } = project;
  return (
    <StyledCard>
      <NavLink
        to={{
          pathname: routes.pages.projects.detail(slug),
          state: {
            project: project,
          },
        }}
      >
        <CardTitle>{title}</CardTitle>
      </NavLink>

      <CardSubTitle>{dateCreated}</CardSubTitle>
      <CardDescription>{description}</CardDescription>
    </StyledCard>
  );
};

export default ProjectCard;
