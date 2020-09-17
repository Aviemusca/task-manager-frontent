import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

import { axiosHeaders } from "../../axiosOptions";
import routes from "../../routes";
import { replaceItem } from "../../utils/arrays";
import { getNonOffsetNewDate } from "../../utils/dates";

import { addWeeks } from "date-fns";

const ProjectsContext = createContext();

function ProjectsProvider(props) {
  const initialNewProject = {
    title: "",
    description: "",
    deadline: addWeeks(new Date(), 1),
    dateCreated: getNonOffsetNewDate(new Date()),
  };
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(initialNewProject);

  useEffect(() => fetchProjects(), []);
  // Re-fetch projects when new project added, as slug created server side
  useEffect(() => {
    fetchProjects();
  }, [projects.length]);

  const fetchProjects = () => {
    axios
      .get(routes.api.projects.viewset, axiosHeaders)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  const resetNewProject = () => {
    setNewProject(initialNewProject);
  };

  const postNewProject = () => {
    axios
      .post(routes.api.projects.viewset, newProject, axiosHeaders)
      .then(() => {
        setProjects([...projects, newProject]);
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
