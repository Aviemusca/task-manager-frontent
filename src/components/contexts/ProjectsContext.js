import React, { useState, createContext } from "react";
import axios from "axios";

import { axiosHeaders } from "../../axiosOptions";
import routes from "../../routes";
import { replaceItem } from "../../utils/arrays";

const ProjectsContext = createContext();

function ProjectsProvider(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = () => {
    axios
      .get(routes.api.projects.viewset, axiosHeaders)
      .then((response) => {
        setProjects(response.data);
      })
      .then(setLoading(false))
      .catch((error) => console.log(error));
  };

  const postProject = (project) => {
    axios
      .post(routes.api.projects.viewset, project, axiosHeaders)
      .then(() => {
        setProjects([...projects, project]);
      })
      .catch((error) => console.log(error));
  };

  const deleteProject = (projectSlug) => {
    axios
      .delete(routes.api.projects.detail(projectSlug), axiosHeaders)
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
        loading,
        setLoading,
        fetchProjects,
        postProject,
        patchProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
}

export { ProjectsContext, ProjectsProvider };
