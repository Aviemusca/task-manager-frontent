import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardHovered,
  CardTitle,
  CardSubTitle,
  CardDescription,
} from "./ProjectStyles";

import routes from "../../routes";

const ProjectCard = ({ project }) => {
  const { title, dateCreated, description, slug } = project;
  const [hovered, setHovered] = useState(false);
  return (
    <CardHovered>
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
    </CardHovered>
  );
};

export default ProjectCard;
