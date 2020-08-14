import React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import Task from "./Task";
import { TasksContext } from "../contexts/TasksContext";

const GroupTaskListContainer = ({ group }) => {
  const { projectTasks } = React.useContext(TasksContext);

  return (
    <TaskListContainer
      tasks={projectTasks.filter((task) => task.groupId === group.id)}
    />
  );
};

const SideBarTaskListContainer = () => {
  const { projectTasks } = React.useContext(TasksContext);
  return <TaskList tasks={projectTasks} />;
};

const TaskListContainer = ({ tasks }) => {
  const [showTasks, setShowTasks] = React.useState(false);

  const handleToggle = () => setShowTasks(!showTasks);

  return showTasks ? (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <Button basic size="mini" circular onClick={handleToggle}>
          <Button.Content visible>
            <Icon name="angle double up" />
          </Button.Content>
        </Button>
      </div>
      <TaskList tasks={tasks} />
    </React.Fragment>
  ) : (
    <div style={{ textAlign: "center" }}>
      <Button basic size="mini" circular onClick={handleToggle}>
        <Button.Content visible>
          <Icon name="ellipsis vertical" />
        </Button.Content>
      </Button>
    </div>
  );
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
export {
  TaskList,
  GroupTaskListContainer as GroupTaskList,
  SideBarTaskListContainer as SideBarTaskList,
};
