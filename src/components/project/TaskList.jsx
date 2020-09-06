import React from "react";
import styled from "styled-components";
import { Popup, List, Button, Icon } from "semantic-ui-react";
import Task from "./Task";
import { TasksContext } from "../contexts/TasksContext";
import { FiltersContext } from "../contexts/FiltersContext";

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const GroupTaskListContainer = ({ group }) => {
  const { projectTasks } = React.useContext(TasksContext);
  const initialShownTasks = 0;

  return (
    <TaskListContainer
      tasks={projectTasks.filter((task) => task.groupId === group.id)}
      initialShownTasks={initialShownTasks}
    />
  );
};

const SideBarTaskListContainer = () => {
  const { projectTasks, managerTasks, setManagerTasks } = React.useContext(
    TasksContext
  );
  const { filterTasks } = React.useContext(FiltersContext);

  const initialShownTasks = 5;

  React.useEffect(() => {
    setManagerTasks(filterTasks(projectTasks));
  }, [JSON.stringify(projectTasks)]);

  return (
    <TaskListContainer
      tasks={managerTasks}
      initialShownTasks={initialShownTasks}
    />
  );
};

const TaskListContainer = ({ tasks, initialShownTasks }) => {
  const [numTasksShown, setNumTasksShown] = React.useState(initialShownTasks);

  const showInc = 5;

  const handlers = {
    showAll: () => setNumTasksShown(tasks.length),
    hideAll: () => setNumTasksShown(0),
    increment: () => setNumTasksShown(numTasksShown + showInc),
    decrement: () => setNumTasksShown(numTasksShown - showInc),
  };

  return (
    <Accordion tasks={tasks} numTasksShown={numTasksShown} handlers={handlers}>
      {" "}
      <TaskList tasks={tasks.filter((task, index) => index < numTasksShown)} />
    </Accordion>
  );
};

const Accordion = ({ tasks, numTasksShown, handlers, children }) => {
  if (numTasksShown <= 0)
    return (
      <ShowButtons
        onShowAll={handlers.showAll}
        onShowInc={handlers.increment}
      />
    );
  if (numTasksShown >= tasks.length)
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
  TaskListContainer as TaskList,
  GroupTaskListContainer as GroupTaskList,
  SideBarTaskListContainer as SideBarTaskList,
};
