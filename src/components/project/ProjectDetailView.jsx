import React, { useContext } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import GroupCardList from "./GroupCardList";
import Loader from "../common/loader";

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
  margin-top: 4em;
  margin-bottom: 6em;
`;

const ProjectDetailViewContainer = (props) => {
  const { projectSlug } = props.match.params;
  const { projects } = useContext(ProjectsContext);
  const { setGroups } = useContext(GroupsContext);
  const {
    loading,
    setLoading,
    getProjectTasks,
    setProjectTasks,
    setManagerTasks,
  } = useContext(TasksContext);

  const project = props.location.state
    ? props.location.state.project
    : projects.find((project) => project.slug === projectSlug);

  React.useEffect(() => {
    setLoading(true);
    getProjectTasks(project.slug);
    return () => {
      setProjectTasks([]);
      setManagerTasks([]);
      setGroups([]);
    };
  }, []);
  return <ProjectDetailView project={project} loading={loading} />;
};

const ProjectDetailView = ({ project, loading }) => {
  return (
    <div>
      <Loader active={loading} />
      <ProjectGrid>
        <div></div>
        <Header project={project} />
      </ProjectGrid>
      <ProjectGrid>
        <SideBar project={project} />
        <GroupCardList project={project} />
      </ProjectGrid>
    </div>
  );
};

export default ProjectDetailViewContainer;
