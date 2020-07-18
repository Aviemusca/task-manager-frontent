import React from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardSubTitle,
  CardDescription,
} from "./ProjectStyles";

import routes from "../../routes";

const ProjectCard = ({ project }) => {
  const { title, dateCreated, description, slug } = project;
  return (
    <Card>
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
    </Card>
  );
};

export default ProjectCard;
