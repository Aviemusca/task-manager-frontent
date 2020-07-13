import React from "react";
import {
  Card,
  CardTitle,
  CardSubTitle,
  CardDescription,
} from "./ProjectStyles";

const project = {
  title: "Task Manager Web App",
  dateCreated: "12th July 2020",
  percentageComplete: 0,
  description: "A web application for managing project tasks.",
};

const ProjectCard = ({ title, dateCreated, description }) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardSubTitle>{dateCreated}</CardSubTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
};

export default ProjectCard;
