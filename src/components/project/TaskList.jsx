import React from "react";
import styled from "styled-components";
import { Popup, List, Button, Icon } from "semantic-ui-react";
import Task from "./Task";
import { TasksContext } from "../contexts/TasksContext";

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const GroupTaskListContainer = ({ group }) => {
  const { projectTasks } = React.useContext(TasksContext);

  return (
    <TaskListContainer
      tasks={projectTasks.filter((task) => task.groupId === group.id)}
    />
  );
};

const SideBarTaskListContainer = () => {
  const { projectTasks, managerTasks, setManagerTasks } = React.useContext(
    TasksContext
  );

  React.useEffect(() => {
    setManagerTasks(projectTasks);
  }, [JSON.stringify(projectTasks)]);

  return <TaskListContainer tasks={managerTasks} />;
};

const TaskListContainer = ({ tasks }) => {
  const [numTasks, setNumTasks] = React.useState(0);

  const showInc = 5;

  const handlers = {
    showAll: () => setNumTasks(tasks.length),
    hideAll: () => setNumTasks(0),
    increment: () => setNumTasks(numTasks + showInc),
    decrement: () => setNumTasks(numTasks - showInc),
  };

  return (
    <Accordion tasks={tasks} numTasks={numTasks} handlers={handlers}>
      {" "}
      <TaskList tasks={tasks.filter((task, index) => index < numTasks)} />
    </Accordion>
  );
};

const Accordion = ({ tasks, numTasks, handlers, children }) => {
  if (numTasks <= 0)
    return (
      <ShowButtons
        onShowAll={handlers.showAll}
        onShowInc={handlers.increment}
      />
    );
  if (numTasks >= tasks.length)
    return (
      <React.Fragment>
        <HideButtons
          onHideAll={handlers.hideAll}
          onHideInc={handlers.decrement}
        />
        {children}
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <HideButtons
        onHideAll={handlers.hideAll}
        onHideInc={handlers.decrement}
      />
      {children}
      <ShowButtons
        onShowAll={handlers.showAll}
        onShowInc={handlers.increment}
      />
    </React.Fragment>
  );
};
const ShowButtons = ({ onShowAll, onShowInc }) => (
  <ButtonWrapper>
    <AccordionButton
      handleClick={onShowInc}
      popupContent={`Show More Tasks`}
      iconName={"angle down"}
    />
    <AccordionButton
      handleClick={onShowAll}
      popupContent={`Show All Tasks`}
      iconName={"double angle down"}
    />
  </ButtonWrapper>
);
const HideButtons = ({ onHideAll, onHideInc }) => (
  <ButtonWrapper>
    <AccordionButton
      handleClick={onHideInc}
      popupContent={`Show Less Tasks`}
      iconName={"angle up"}
    />
    <AccordionButton
      handleClick={onHideAll}
      popupContent={`Hide All Tasks`}
      iconName={"double angle up"}
    />
  </ButtonWrapper>
);
const AccordionButton = ({ handleClick, popupContent, iconName }) => (
  <Button basic size="mini" circular onClick={handleClick}>
    <Button.Content visible>
      <Popup content={popupContent} trigger={<Icon name={iconName} />} />
    </Button.Content>
  </Button>
);

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
