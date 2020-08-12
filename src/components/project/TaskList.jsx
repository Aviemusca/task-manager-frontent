import React from "react";
import { List } from "semantic-ui-react";
import Task from "./Task";
import { TasksContext } from "../contexts/TasksContext";

const GroupTaskListContainer = ({ group, onProgressChange }) => {
  const { projectTasks } = React.useContext(TasksContext);
  return (
    <TaskList
      tasks={projectTasks.filter((task) => task.groupId === group.id)}
      onProgressChange={onProgressChange}
    />
  );
};

const SideBarTaskListContainer = ({ project }) => {
  const { projectTasks, getProjectTasks } = React.useContext(TasksContext);
  React.useEffect(() => {
    getProjectTasks();
    console.log("here");
  }, [project.taskOrder]);

  return <TaskList tasks={projectTasks} />;
};

const TaskList = ({ tasks, onProgressChange }) => {
  return (
    <List animated divided selection verticalAlign="middle">
      {tasks.map((task) => {
        return (
          <List.Item key={task.id}>
            <List.Content>
              <List.Header>
                <Task tsk={task} onProgressChange={onProgressChange} />
              </List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};
export {
  TaskList,
  GroupTaskListContainer as GroupTaskList,
  SideBarTaskListContainer as SideBarTaskList,
};
