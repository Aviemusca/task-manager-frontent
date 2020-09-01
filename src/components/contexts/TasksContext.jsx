import React from "react";
import axios from "axios";

import { axiosHeaders } from "../../axiosOptions";
import { replaceItem } from "../../utils/arrays";
import routes from "../../routes";

const TasksContext = React.createContext();

function TasksProvider(props) {
  // Provider for the tasks of a given project
  const emptyTask = { title: "", description: "" };
  // Tasks loaded from the backend
  const [projectTasks, setProjectTasks] = React.useState([]);
  // Tasks displayed in the manager / side-bar (filtered etc..)
  const [managerTasks, setManagerTasks] = React.useState([]);

  const getProjectTasks = (projectSlug) => {
    axios
      .get(routes.api.tasks.projectViewset(projectSlug), axiosHeaders)
      .then((response) => {
        setProjectTasks(response.data);
      })
      .catch((error) => console.log(error));
  };

  const postTask = (newTask) => {
    axios
      .post(
        routes.api.tasks.projectViewset(newTask.projectSlug),
        newTask,
        axiosHeaders
      )
      .then((response) => handlePostSuccess(response.data))
      .catch((error) => console.log(error));
  };

  const handlePostSuccess = (newTask) => {
    setProjectTasks([...projectTasks, newTask]);
  };

  const patchTask = (task) => {
    axios
      .patch(
        routes.api.tasks.projectDetail(task.projectSlug, task.id),
        task,
        axiosHeaders
      )
      .then((response) => handlePatchSuccess(response.data))
      .catch((error) => console.log(error));
  };

  const handlePatchSuccess = (patchedTask) => {
    const patchedIndex = projectTasks.findIndex(
      (task) => task.id === patchedTask.id
    );
    const newTasks = replaceItem(projectTasks, patchedTask, patchedIndex);
    setProjectTasks(newTasks);
  };

  const deleteTask = (task) => {
    axios
      .delete(
        routes.api.tasks.projectDetail(task.projectSlug, task.id),
        axiosHeaders
      )
      .then(() => {
        setProjectTasks(projectTasks.filter((tsk) => tsk.id !== task.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <TasksContext.Provider
      value={{
        projectTasks,
        setProjectTasks,
        managerTasks,
        setManagerTasks,
        getProjectTasks,
        postTask,
        patchTask,
        deleteTask,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
}

export { TasksContext, TasksProvider };
