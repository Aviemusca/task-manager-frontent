import React from "react";
import { TasksContext } from "../contexts/TasksContext";
import styled from "styled-components";
import { Card, Icon, Popup } from "semantic-ui-react";
import TaskModal from "./TaskModal";
import { StyledProgressBar } from "../common/progressBar";
import { CardDates } from "../common/dates";
import {
  getPriorityColor,
  getDifficultyColor,
  getStateColor,
  taskStatuses,
  taskDeadlines,
} from "../../taskOptions";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: minmax(2em, 4em);
  overflow: auto;
  padding: 0.25em 0;
  background: #25779510;
  border-radius: 5px;
`;

const StyledTitle = styled.div`
  font-size: 1.15em;
  width: 60%;
  color: #333;
`;

const StyledIcons = styled.div`
  text-align: left;
  width: 20%;
`;
const StyledColorBoxes = styled.div`
  text-align: right;
  width: 20%;
`;

const StyledColorBox = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  border-radius: 25px;
  border: solid 1px #777;
  background: rgba(${(props) => `${props.color}`});
`;

const SecondaryProgressBarWrapper = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledProgressTitle = styled.span`
  color: #777;
`;
const TaskContainer = ({ tsk }) => {
  const [task, setTask] = React.useState(tsk);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [priorityColor, setPriorityColor] = React.useState([]);
  const [stateColor, setStateColor] = React.useState([]);
  const [difficultyColor, setDifficultyColor] = React.useState([]);
  const [selected, setSelected] = React.useState(false);
  const { projectTasks, setProjectTasks } = React.useContext(TasksContext);

  React.useEffect(() => {
    setPriorityColor(getPriorityColor(task.priority));
  }, [task.priority]);

  React.useEffect(() => {
    setStateColor(getStateColor(task.state));
  }, [task.state]);

  React.useEffect(() => {
    setDifficultyColor(getDifficultyColor(task.difficulty));
  }, [task.difficulty]);

  React.useEffect(() => {
    setTask(tsk);
  }, [JSON.stringify(tsk)]);

  const handleClick = (event) => {
    if (event.shiftKey) setModalOpen(true);
    if (event.ctrlKey) setSelected(!selected);
  };

  const closeModal = () => setModalOpen(false);

  const state = {
    task,
    modalOpen,
    expanded,
    selected,
    colors: {
      priorityColor,
      difficultyColor,
      stateColor,
    },
  };
  const setState = {
    setTask,
    setExpanded,
    setModal: {
      setModalOpen,
      closeModal,
    },
    setColors: {
      setPriorityColor,
      setDifficultyColor,
      setStateColor,
    },
  };
  return (
    <div onClick={handleClick}>
      <Task state={state} setState={setState} />
    </div>
  );
};

const Task = ({ state, setState }) => {
  const { task, expanded, selected, modalOpen } = state;
  const { setTask, setExpanded } = setState;
  const { closeModal } = setState.setModal;

  return (
    <React.Fragment>
      <Card
        fluid
        onClick={(event) => {
          if (!event.ctrlKey && !event.shiftKey) setExpanded(!expanded);
        }}
        header={<Header task={task} colors={state.colors} />}
        description={
          expanded && (
            <React.Fragment>
              {" "}
              <Description description={task.description} />
              <div style={{ marginTop: "0.5em" }}>
                Task Group: {task.groupTitle}
              </div>
            </React.Fragment>
          )
        }
        color={selected && "blue"}
        meta={
          expanded && (
            <CardDates
              dateCreated={task.dateCreated}
              deadline={task.deadline}
            />
          )
        }
        extra={
          expanded && (
            <SecondaryProgressBars task={state.task} colors={state.colors} />
          )
        }
      />
      {modalOpen && (
        <TaskModal
          task={task}
          setTask={setTask}
          open={modalOpen}
          closeModal={closeModal}
        />
      )}
    </React.Fragment>
  );
};

const Description = ({ description }) => {
  return description ? (
    <div>Description: {description}</div>
  ) : (
    <div>Description: None</div>
  );
};
const Header = ({ task, colors }) => {
  const { title, state } = task;
  return (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledIcons>
        <StatusIcon taskStatus={state} />
        {state !== 2 && (
          <DeadlineWarningContainer
            taskDeadline={task.deadline}
            taskStatus={state}
          />
        )}
      </StyledIcons>
      <ColorBoxes task={task} colors={colors} />
    </StyledHeader>
  );
};

const DeadlineWarningContainer = ({ taskDeadline, taskStatus }) => {
  const [deadlineStatus, setDeadlineStatus] = React.useState(null);

  React.useEffect(() => {
    setDeadlineStatus(getDeadlineStatus());
  }, [taskDeadline, taskStatus]);

  const getDeadlineStatus = () => {
    const deadlineDate = new Date(taskDeadline);
    const currentDate = new Date();
    const difference = deadlineDate - currentDate;
    // Deadline has passed
    if (difference < 0) return 0;
    // 24 hours till deadline
    if (difference < 86400000) return 1;
    // 48 hours till deadline
    if (difference < 172800000) return 2;
    return null;
  };

  return (
    <React.Fragment>
      {deadlineStatus !== null && taskStatus !== 2 && (
        <DeadlineWarning deadlineStatus={deadlineStatus} />
      )}
    </React.Fragment>
  );
};

const DeadlineWarning = ({ deadlineStatus }) => {
  return (
    <Popup
      content={taskDeadlines[deadlineStatus].popupContent}
      position="right center"
      trigger={
        <Icon
          color={taskDeadlines[deadlineStatus].color}
          name="warning sign"
          size="large"
        />
      }
    />
  );
};

const StatusIcon = ({ taskStatus }) => {
  const { popupContent, color, iconName } = taskStatuses[taskStatus];
  return (
    <Popup
      content={popupContent}
      position="right center"
      trigger={<Icon size="large" name={iconName} color={color} />}
    />
  );
};
const ColorBoxes = ({ task, colors }) => {
  const { priorityColor, difficultyColor } = colors;
  const { priority, difficulty } = task;
  return (
    <StyledColorBoxes>
      <ColorBox
        color={priorityColor}
        popupContent={`Priority (${priority}/10)`}
      />
      <ColorBox
        color={difficultyColor}
        popupContent={`Difficulty (${difficulty}/10)`}
      />
    </StyledColorBoxes>
  );
};

const ColorBox = ({ popupContent, color }) => {
  return (
    <Popup
      flowing
      hoverable
      position="right center"
      content={popupContent}
      trigger={<StyledColorBox color={color} />}
    />
  );
};
const SecondaryProgressBar = ({ color, value, total }) => {
  return (
    <StyledProgressBar
      style={{ margin: "0.5em 0", flexGrow: "4" }}
      size="small"
      progress="ratio"
      color={color}
      value={value}
      total={total}
    />
  );
};

const SecondaryProgressBars = ({ task, colors }) => {
  const { stateColor, priorityColor, difficultyColor } = colors;
  const { state, priority, difficulty } = task;
  return (
    <React.Fragment>
      <SecondaryProgressBarWrapper>
        <StyledProgressTitle>Status: &nbsp;</StyledProgressTitle>
        <SecondaryProgressBar
          color={taskStatuses[task.state].color}
          value={state}
          total="2"
        />
      </SecondaryProgressBarWrapper>
      <SecondaryProgressBarWrapper>
        <StyledProgressTitle>Priority: &nbsp;</StyledProgressTitle>
        <SecondaryProgressBar
          color={priorityColor}
          value={priority}
          total="10"
        />
      </SecondaryProgressBarWrapper>
      <SecondaryProgressBarWrapper>
        <StyledProgressTitle>Difficulty: &nbsp;</StyledProgressTitle>
        <SecondaryProgressBar
          color={difficultyColor}
          value={difficulty}
          total="10"
        />
      </SecondaryProgressBarWrapper>
    </React.Fragment>
  );
};
export default TaskContainer;
export { Task };
