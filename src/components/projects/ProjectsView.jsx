import React, { Component } from "react";
import axios from "axios";

import ProjectsViewHeader from "./ProjectsViewHeader";
import ProjectCardList from "./ProjectCardList";
import AddProjectModal from "./AddProjectModal";

import routes from "../../routes";

const axiosOptions = {
  url: routes.api.projects.viewset,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem(
      "taskManagerAuthenticationToken"
    )}`,
  },
};

class ProjectsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      newProject: {
        required: false,
        title: null,
        description: null,
      },
    };
  }

  componentDidMount() {
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";

    axios(axiosGetOptions)
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  handleAddProjectInputChange = (event) => {
    const { name, value } = event.target;
    const { newProject } = { ...this.state };
    newProject[name] = value;
    this.setState({ ...this.state, newProject });
    console.log(this.state);
  };

  handleAddProjectSubmit = (event) => {
    event.preventDefault();
    this.handleAddProjectPostRequest();
  };

  handleAddProjectPostRequest = () => {
    const { title, description } = this.state.newProject;
    const axiosPostOptions = axiosOptions;
    axiosPostOptions.method = "POST";
    axiosPostOptions.data = { title, description };

    axios(axiosPostOptions)
      .then(() => {
        console.log("success");
      })
      .catch((error) => console.log(error));
  };

  injectAddProjectModal = () => {
    const { newProject } = { ...this.state };
    if (newProject.required)
      return (
        <AddProjectModal
          newProject={newProject}
          handleModalClose={this.handleAddProjectModalClose}
          handleSubmit={(event) => this.handleAddProjectSubmit(event)}
          handleInputChange={(event) => this.handleAddProjectInputChange(event)}
        />
      );
  };

  handleAddProject = () => {
    const { newProject } = { ...this.state };
    newProject.required = true;
    this.setState({ ...this.state, newProject });
  };

  handleAddProjectModalClose = () => {
    const { newProject } = { ...this.state };
    newProject.required = false;
    this.setState({ ...this.state, newProject });
  };
  render() {
    const { projects, newProject } = this.state;
    return (
      <React.Fragment>
        {this.injectAddProjectModal()}
        <ProjectsViewHeader handleAddProject={this.handleAddProject} />
        <ProjectCardList projects={projects} />
      </React.Fragment>
    );
  }
}

export default ProjectsView;
