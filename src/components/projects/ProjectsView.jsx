import React, { Component, useState, useEffect } from "react";
import axios from "axios";

import ProjectsViewHeader from "./ProjectsViewHeader";
import ProjectCardList from "./ProjectCardList";
import AddProjectModal from "./AddProjectModal";

import routes from "../../routes";

import { ProjectsProvider } from "../contexts/ProjectContext";

const axiosOptions = {
  url: routes.api.projects.viewset,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem(
      "taskManagerAuthenticationToken"
    )}`,
  },
};

function ProjectsView(props) {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    required: false,
    content: { title: "", description: "" },
  });

  useEffect(() => fetchProjects(), []);
  useEffect(() => fetchProjects(), [projects.length]);

  const fetchProjects = () => {
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";

    axios(axiosGetOptions)
      .then((response) => {
        setProjects(response.data);
        console.log(projects);
      })
      .catch((error) => console.log(error));
  };
  const handleAddProjectInputChange = (event) => {
    const { name, value } = event.target;
    const project = { ...newProject };
    project.content[name] = value;
    setNewProject(project);
  };

  const handleAddProjectSubmit = (event) => {
    event.preventDefault();
    handleProjectPost();
  };

  const handleProjectPost = () => {
    const { title, description } = newProject.content;
    const axiosPostOptions = axiosOptions;
    axiosPostOptions.method = "POST";
    axiosPostOptions.data = { title, description };

    axios(axiosPostOptions)
      .then(() => {
        console.log("success");
        handleProjectPostSuccess();
      })
      .catch((error) => console.log(error));
  };

  const handleProjectPostSuccess = () => {
    const project = { ...newProject };
    project.required = false;
    setNewProject(project);
    setProjects([...projects, newProject.content]);
  };

  const resetNewProjectContent = () => {
    const project = { ...newProject };
    project.content.title = "";
    project.content.description = "";
    setNewProject(project);
  };

  const injectAddProjectModal = () => {
    if (newProject.required)
      return (
        <AddProjectModal
          newProject={newProject}
          handleModalClose={closeAddProjectModal}
          handleSubmit={(event) => handleAddProjectSubmit(event)}
          handleInputChange={(event) => handleAddProjectInputChange(event)}
        />
      );
  };

  const handleAddProject = () => {
    resetNewProjectContent();
    const project = { ...newProject };
    project.required = true;
    setNewProject(project);
  };

  const closeAddProjectModal = () => {
    const project = { ...newProject };
    project.required = false;
    setNewProject(project);
  };
  return (
    <React.Fragment>
      {injectAddProjectModal()}
      <ProjectsViewHeader handleAddProject={handleAddProject} />
      <ProjectCardList projects={projects} />
    </React.Fragment>
  );
}

export default ProjectsView;
