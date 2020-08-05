import React from "react";
import { List } from "semantic-ui-react";
import Task from "./Task";

const TaskListContainer = ({ tasks, setTasks }) => {
  return <TaskList tasks={tasks} setTasks={setTasks} />;
};

const TaskList = ({ tasks, setTasks }) => {
  return (
    <List animated divided selection verticalAlign="middle">
      {tasks.map((task) => {
        return (
          <List.Item key={task.id}>
            <List.Content>
              <List.Header>
                <Task tsk={task} tasks={tasks} setTasks={setTasks} />
              </List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};
export default TaskListContainer;
