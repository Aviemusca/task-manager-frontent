import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import SideBar from "./SideBar";
import GroupCardList from "./GroupCardList";
import Header from "./Header";
import DeleteProjectModal from "./DeleteProjectModal";
import AddGroupModal from "./AddGroupModal";
import modalMixin from "../common/modalMixin";

import { ProjectsContext } from "../contexts/ProjectContext";
import routes from "../../routes";

import { ProjectContainer, ProjectGrid, ProjectHeader } from "./Styles";

const axiosOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem(
      "taskManagerAuthenticationToken"
    )}`,
  },
};

function ProjectDetailView(props) {
  const initialProject = props.location.state.project;
  const initialNewGroup = {
    required: false,
    content: {
      title: "",
      description: "",
    },
  };
  const [project, setProject] = useState(initialProject);
  const [groups, setGroups] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [deleteProject, setDeleteProject] = useState(false);
  const [newGroup, setNewGroup] = useState(initialNewGroup);
  const { projectSlug } = props.match.params;

  useEffect(() => {
    if (Object.values(project).every((item) => !item)) fetchProject();
  }, []);

  useEffect(() => fetchGroups(), []);

  const fetchProject = () => {
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";
    axiosGetOptions.url = routes.api.projects.detail(projectSlug);

    axios(axiosGetOptions)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => console.log(error));
  };
  const fetchGroups = () => {
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";
    axiosGetOptions.url = routes.api.groups.viewset(projectSlug);

    axios(axiosGetOptions)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteProject = () => {
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "DELETE";
    axiosGetOptions.url = routes.api.projects.detail(projectSlug);

    axios(axiosGetOptions).catch((error) => console.log(error));
  };

  const onDeleteProject = () => {
    handleDeleteProject();
    setRedirect(routes.pages.projects.list);
  };

  const injectRedirectProjects = () => {
    if (redirect) return <Redirect to={redirect} />;
  };

  const injectDeleteProjectModal = () => {
    if (deleteProject)
      return (
        <DeleteProjectModal
          onModalClose={closeDeleteProjectModal}
          onDeleteProject={onDeleteProject}
          deleteProject={deleteProject}
        />
      );
  };
  const injectAddGroupModal = () => {
    if (newGroup.required)
      return (
        <AddGroupModal
          onModalClose={closeAddGroupModal}
          onSubmit={handleGroupSubmit}
          onInputChange={handleGroupInputChange}
          newGroup={newGroup}
        />
      );
  };
  const handleGroupInputChange = (event) => {
    const { name, value } = event.target;
    const group = { ...newGroup };
    const content = { ...newGroup.content };
    content[name] = value;
    group.content = content;
    setNewGroup(group);
  };
  const handleGroupSubmit = (event) => {
    event.preventDefault();
    handleGroupPost();
  };
  const handleGroupPost = () => {
    const axiosPostOptions = axiosOptions;
    axiosPostOptions.url = routes.api.groups.viewset(projectSlug);
    axiosPostOptions.method = "POST";
    axiosPostOptions.data = newGroup.content;

    axios(axiosPostOptions)
      .then(() => {
        handleGroupPostSuccess();
      })
      .catch((error) => console.log(error));
  };

  const handleGroupPostSuccess = () => {
    setGroups([newGroup.content, ...groups]);
    closeAddGroupModal();
  };
  const openDeleteProjectModal = () => {
    setDeleteProject(true);
  };

  const closeDeleteProjectModal = () => {
    setDeleteProject(false);
  };

  const openAddGroupModal = () => {
    const group = { ...newGroup };
    group.required = true;
    setNewGroup(group);
  };

  const closeAddGroupModal = () => {
    const group = { ...newGroup };
    group.required = false;
    setNewGroup(group);
  };

  return (
    <ProjectContainer>
      {injectRedirectProjects()}
      {injectDeleteProjectModal()}
      {injectAddGroupModal()}
      <ProjectHeader>
        <Header
          project={project}
          onDeleteProject={openDeleteProjectModal}
          onAddGroup={openAddGroupModal}
        />
      </ProjectHeader>
      <ProjectGrid>
        <SideBar project={project} />
        <GroupCardList groups={groups} />
      </ProjectGrid>
    </ProjectContainer>
  );
}

Object.assign(ProjectDetailView.prototype, modalMixin);
export default ProjectDetailView;
