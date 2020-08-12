import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

import axiosOptions, { axiosHeaders } from "../../axiosOptions";
import routes from "../../routes";
import { replaceItem } from "../../utils/arrays";

const ProjectsContext = createContext();

function ProjectsProvider(props) {
  const initialNewProject = { title: "", description: "" };
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(initialNewProject);

  useEffect(() => fetchProjects(), []);
  // Re-fetch projects when new project added, as slug created server side
  useEffect(() => {
    fetchProjects();
  }, [projects.length]);

  const fetchProjects = () => {
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";
    axiosGetOptions.url = routes.api.projects.viewset;

    axios(axiosGetOptions)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  const resetNewProject = () => {
    setNewProject(initialNewProject);
  };

  const postNewProject = () => {
    const axiosPostOptions = axiosOptions;
    axiosPostOptions.method = "POST";
    axiosPostOptions.url = routes.api.projects.viewset;
    axiosPostOptions.data = newProject;
    axios(axiosPostOptions)
      .then(() => {
        setProjects([...projects, newProject]);
      })
      .catch((error) => console.log(error));
  };

  const deleteProject = (projectSlug) => {
    const axiosDeleteOptions = axiosOptions;
    axiosDeleteOptions.method = "DELETE";
    axiosDeleteOptions.url = routes.api.projects.detail(projectSlug);
    axios(axiosDeleteOptions)
      .then(() => {
        setProjects(projects.filter((project) => project.slug !== projectSlug));
      })
      .catch((error) => console.log(error));
  };

  const patchProject = (project) => {
    axios
      .patch(routes.api.projects.detail(project.slug), project, axiosHeaders)
      .then((response) => handlePatchSuccess(response.data))
      .catch((error) => console.log(error));
  };

  const handlePatchSuccess = (patchedProject) => {
    const patchedIndex = projects.findIndex(
      (project) => project.id === patchedProject.id
    );
    const newProjects = replaceItem(projects, patchedProject, patchedIndex);
    setProjects(newProjects);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        newProject,
        setNewProject,
        resetNewProject,
        fetchProjects,
        postNewProject,
        patchProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
}

export { ProjectsContext, ProjectsProvider };
