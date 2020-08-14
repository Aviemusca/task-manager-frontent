import React, { useContext } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import GroupCardList from "./GroupCardList";
import Header from "./Header";

import { ProjectsContext } from "../contexts/ProjectsContext";
import { TasksContext } from "../contexts/TasksContext";

const ProjectHeader = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: auto;
  align-items: start;
  grid-gap: 2em;
`;

const ProjectDetailViewContainer = (props) => {
  const { projectSlug } = props.match.params;
  const { projects } = useContext(ProjectsContext);
  const { getProjectTasks } = useContext(TasksContext);

  const project = props.location.state
    ? props.location.state.project
    : projects.find((project) => project.slug === projectSlug);

  React.useEffect(() => {
    getProjectTasks(project.slug);
  }, []);
  return <ProjectDetailView project={project} />;
};

const ProjectDetailView = ({ project }) => {
  return (
    <div>
      <ProjectHeader>
        <Header project={project} />
      </ProjectHeader>
      <ProjectGrid>
        <SideBar project={project} />
        <GroupCardList project={project} />
      </ProjectGrid>
    </div>
  );
};

export default ProjectDetailViewContainer;
