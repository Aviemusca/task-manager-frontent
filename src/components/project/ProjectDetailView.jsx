import React, { useContext } from "react";

import SideBar from "./SideBar";
import GroupCardList from "./GroupCardList";
import Header from "./Header";

import { ProjectsContext } from "../contexts/ProjectsContext";

import { ProjectContainer, ProjectGrid, ProjectHeader } from "./Styles";

function ProjectDetailView(props) {
  const { projectSlug } = props.match.params;
  const { projects } = useContext(ProjectsContext);
  const project = props.location.state
    ? props.location.state.project
    : projects.find((project) => project.slug === projectSlug);

  return (
    <ProjectContainer>
      <ProjectHeader>
        <Header project={project} />
      </ProjectHeader>
      <ProjectGrid>
        <SideBar project={project} />
        <GroupCardList project={project} />
      </ProjectGrid>
    </ProjectContainer>
  );
}

export default ProjectDetailView;
