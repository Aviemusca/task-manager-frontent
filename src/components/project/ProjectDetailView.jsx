import React, { Component, useContext } from "react";
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

class ProjectDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      groups: [],
      redirect: null,
      deleteProject: false,
      newGroup: {
        required: false,
        content: {
          title: "",
          description: "",
        },
      },
    };
  }
  componentDidMount = () => {
    const { project } = this.props.location.state;
    if (Object.values(project).every((item) => !item)) this.fetchProject();
    this.setState({ ...this.state, project });
    this.fetchGroups();
  };
  fetchProject = () => {
    const { projectSlug } = this.props.match.params;
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";
    axiosGetOptions.url = routes.api.projects.detail(projectSlug);

    axios(axiosGetOptions)
      .then((response) => {
        this.setState({ ...this.state, project: response.data });
      })
      .catch((error) => console.log(error));
  };
  fetchGroups = () => {
    const { projectSlug } = this.props.match.params;
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";
    axiosGetOptions.url = routes.api.groups.viewset(projectSlug);

    axios(axiosGetOptions)
      .then((response) => {
        this.setState({ ...this.state, groups: response.data });
        console.log(this.state);
      })
      .catch((error) => console.log(error));
  };

  handleDeleteProject = () => {
    const { projectSlug } = this.props.match.params;
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "DELETE";
    axiosGetOptions.url = routes.api.projects.detail(projectSlug);

    axios(axiosGetOptions).catch((error) => console.log(error));
  };

  onDeleteProject = () => {
    this.handleDeleteProject();
    this.setState({ redirect: routes.pages.projects.list });
  };
  injectRedirectProjects = () => {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
  };

  injectDeleteProjectModal = () => {
    const { deleteProject } = { ...this.state };
    if (deleteProject)
      return (
        <DeleteProjectModal
          onModalClose={this.closeDeleteProjectModal}
          onDeleteProject={this.onDeleteProject}
          deleteProject={deleteProject}
        />
      );
  };
  injectAddGroupModal = () => {
    const { newGroup } = { ...this.state };
    if (newGroup.required)
      return (
        <AddGroupModal
          onModalClose={this.closeModal(newGroup)}
          onSubmit={this.handleGroupSubmit}
          onInputChange={this.handleGroupInputChange}
          newGroup={newGroup}
        />
      );
  };
  handleGroupInputChange = (event) => {
    const { name, value } = event.target;
    const { newGroup } = { ...this.state };
    newGroup.content[name] = value;
    this.setState({ ...this.state, newGroup });
  };
  handleGroupSubmit = (event) => {
    event.preventDefault();
    this.handleGroupPost();
  };
  handleGroupPost = () => {
    const axiosPostOptions = axiosOptions;
    const { projectSlug } = this.props.match.params;
    axiosPostOptions.url = routes.api.groups.viewset(projectSlug);
    axiosPostOptions.method = "POST";
    axiosPostOptions.data = this.state.newGroup.content;

    axios(axiosPostOptions)
      .then(() => {
        this.handleGroupPostSuccess();
      })
      .catch((error) => console.log(error));
  };

  handleGroupPostSuccess = () => {
    const { groups, newGroup } = this.state;
    this.setState({ ...this.state, groups: [newGroup.content, ...groups] });
    this.closeAddGroupModal();
  };
  openDeleteProjectModal = () => {
    let { deleteProject } = { ...this.state };
    deleteProject = true;
    this.setState({ ...this.state, deleteProject });
  };

  closeDeleteProjectModal = () => {
    const newState = { ...this.state };
    newState.deleteProject = false;
    this.setState(newState);
  };

  openAddGroupModal = () => {
    const { newGroup } = { ...this.state };
    newGroup.required = true;
    this.setState({ ...this.state, newGroup });
  };

  closeAddGroupModal = () => {
    const { newGroup } = { ...this.state };
    newGroup.required = false;
    this.setState({ ...this.state, newGroup });
  };

  render() {
    const { project, groups } = this.state;
    return (
      <ProjectContainer>
        {this.injectRedirectProjects()}
        {this.injectDeleteProjectModal()}
        {this.injectAddGroupModal()}
        <ProjectHeader>
          <Header
            project={project}
            onDeleteProject={this.openDeleteProjectModal}
            onAddGroup={this.openAddGroupModal}
          />
        </ProjectHeader>
        <ProjectGrid>
          <SideBar project={project} />
          <GroupCardList groups={groups} />
        </ProjectGrid>
      </ProjectContainer>
    );
  }
}

Object.assign(ProjectDetailView.prototype, modalMixin);
export default ProjectDetailView;
