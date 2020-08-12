import React, { useContext } from "react";

import SideBar from "./SideBar";
import GroupCardList from "./GroupCardList";
import Header from "./Header";

import { ProjectsContext } from "../contexts/ProjectsContext";
import { TasksContext } from "../contexts/TasksContext";

import { ProjectContainer, ProjectGrid, ProjectHeader } from "./Styles";

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
};

export default ProjectDetailViewContainer;
