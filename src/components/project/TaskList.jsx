import React from "react";
import { List } from "semantic-ui-react";
import Task from "./Task";

const TaskListContainer = ({ tasks }) => {
  return <TaskList tasks={tasks} />;
};

const TaskList = ({ tasks }) => {
  return (
    <List animated divided selection verticalAlign="middle">
      {tasks.map((task) => {
        return (
          <List.Item key={task.id}>
            <List.Content>
              <List.Header>
                <Task tsk={task} />
              </List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};
export default TaskListContainer;
