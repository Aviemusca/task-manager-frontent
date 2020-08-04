import React from "react";
import axios from "axios";

import { axiosHeaders } from "../../axiosOptions";
import routes from "../../routes";

const TasksContext = React.createContext();

function TasksProvider(props) {
  // Provider for the tasks of a given project
  const emptyTask = { title: "", description: "" };
  const [tasks, setTasks] = React.useState([]);

  const getTasks = (group) => {
    axios
      .get(routes.api.tasks.viewset(group.projectSlug, group.id), axiosHeaders)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.log(error));
  };

  const postTask = (newTask, setNewTask) => {
    axios
      .post(
        routes.api.tasks.viewset(newTask.projectSlug, newTask.groupId),
        newTask,
        axiosHeaders
      )
      .then((response) => handlePostSuccess(response.data, setNewTask))
      .catch((error) => console.log(error));
  };

  const handlePostSuccess = (newTask, setNewTask) => {
    setTasks([...tasks, newTask]);
    setNewTask(emptyTask);
  };

  const patchTask = (task) => {
    axios
      .patch(
        routes.api.tasks.detail(task.projectSlug, task.groupId, task.id),
        task,
        axiosHeaders
      )
      .then((response) => handlePatchSuccess(response.data))
      .catch((error) => console.log(error));
  };

  const handlePatchSuccess = (patchedTask) => {
    const patchedIndex = tasks.findIndex((task) => task.id === patchedTask.id);
    const newTasks = [
      ...tasks.slice(0, patchedIndex),
      patchedTask,
      ...tasks.slice(patchedIndex + 1),
    ];
    setTasks(newTasks);
  };

  const deleteTask = (task) => {
    axios
      .delete(
        routes.api.tasks.detail(task.projectSlug, task.groupId, task.id),
        axiosHeaders
      )
      .then(() => {
        setTasks(tasks.filter((tsk) => tsk.id !== task.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        getTasks,
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
