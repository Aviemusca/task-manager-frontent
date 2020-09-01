import React, { useContext } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import GroupCardList from "./GroupCardList";

import { ProjectsContext } from "../contexts/ProjectsContext";
import { GroupsContext } from "../contexts/GroupsContext";
import { TasksContext } from "../contexts/TasksContext";
import Header from "./Header";

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1.75fr 3fr;
  grid-template-rows: auto;
  align-items: start;
  grid-gap: 6em;
`;

const ProjectDetailViewContainer = (props) => {
  const { projectSlug } = props.match.params;
  const { projects } = useContext(ProjectsContext);
  const { setGroups } = useContext(GroupsContext);
  const { getProjectTasks, setProjectTasks, setManagerTasks } = useContext(
    TasksContext
  );

  const project = props.location.state
    ? props.location.state.project
    : projects.find((project) => project.slug === projectSlug);

  React.useEffect(() => {
    getProjectTasks(project.slug);
    return () => {
      setProjectTasks([]);
      setManagerTasks([]);
      setGroups([]);
    };
  }, []);
  return <ProjectDetailView project={project} />;
};

const ProjectDetailView = ({ project }) => {
  return (
    <div>
      <Header project={project} />
      <ProjectGrid>
        <SideBar project={project} />
        <GroupCardList project={project} />
      </ProjectGrid>
    </div>
  );
};

export default ProjectDetailViewContainer;
