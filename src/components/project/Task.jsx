import React from "react";
import styled from "styled-components";
import { Card, Icon, Transition, Popup } from "semantic-ui-react";
import TaskModal from "./TaskModal";
import { StyledProgressBar } from "../common/progressBar";
import {
  getPriorityColor,
  getDifficultyColor,
  getStateColor,
} from "../../taskOptions";
import { formatDateToString } from "../../utils/dates";

import { taskStates } from "../../taskOptions";

const TaskMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: minmax(2em, 4em);
  overflow: auto;
  padding: 0.25em 0;
`;

const TaskTitle = styled.div`
  font-size: 1.15em;
  width: 60%;
  color: #333;
`;

const TaskColors = styled.div`
  text-align: right;
  width: 40%;
`;

const TaskColorBox = styled.span`
  display: inline-block;
  width: 20px;
  height: 30px;
  margin: 0 5px;
  border-radius: 5px;
  background: rgba(${(props) => `${props.color}`});
`;

const TaskContainer = ({ tsk }) => {
  const [task, setTask] = React.useState(tsk);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [expandedTask, setExpandedTask] = React.useState(false);
  const [deadlineStatus, setDeadlineStatus] = React.useState(0);
  const [priorityColor, setPriorityColor] = React.useState([]);
  const [stateColor, setStateColor] = React.useState([]);
  const [difficultyColor, setDifficultyColor] = React.useState([]);
  const [deadlineColor, setDeadlineColor] = React.useState([]);

  React.useEffect(() => {
    setPriorityColor(getPriorityColor(task.priority));
  }, [task.priority]);

  React.useEffect(() => {
    setStateColor(getStateColor(task.state));
  }, [task.state]);

  React.useEffect(() => {
    setDifficultyColor(getDifficultyColor(task.difficulty));
  }, [task.difficulty]);

  const handleModalOpen = (event) => {
    if (event.ctrlKey) setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const state = {
    task,
    modalOpen,
    expandedTask,
    deadlineStatus,
    colors: {
      priorityColor,
      difficultyColor,
      stateColor,
    },
  };
  const setState = {
    setTask,
    setExpandedTask,
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
    <div onClick={handleModalOpen}>
      <Task state={state} setState={setState} />
    </div>
  );
};

const DeadlineWarningContainer = ({ task }) => {
  const [deadlineStatus, setDeadlineStatus] = React.useState(0);
  React.useEffect(() => {
    setDeadlineStatus(getDeadlineStatus(task.deadline));
  }, [task.deadline, task.state]);

  const getDeadlineStatus = () => {
    const deadlineDate = new Date(task.deadline);
    const currentDate = new Date();
    const difference = deadlineDate - currentDate;
    if (task.state === 2) return 0;
    // Passed deadlined
    if (difference < 0) return 3;
    // 24 hours till deadline
    if (difference < 86400000) return 2;
    // 48 hours till deadline
    if (difference < 172800000) return 1;
    return 0;
  };

  const getDeadlineColor = (level) => {
    switch (level) {
      case 0:
        return null;
        break;
      case 1:
        return "yellow";
        break;
      case 2:
        return "orange";
        break;
      case 3:
        return "red";
        break;
      default:
        throw new Error(`Deadline status level ${level} not recognized`);
    }
  };
  return (
    <React.Fragment>
      {task.state !== 2 && (
        <DeadlineWarning
          color={getDeadlineColor(deadlineStatus)}
          visible={task.state !== 2}
        />
      )}
    </React.Fragment>
  );
};

const DeadlineWarning = ({ color, visible }) => {
  return (
    <Transition visible={visible} animation="flash" duration={5000}>
      <Icon color={color} name="warning sign" size="large" />
    </Transition>
  );
};

const Task = ({ state, setState }) => {
  const { task, expandedTask, modalOpen, deadlineStatus } = state;
  const { priorityColor, difficultyColor, stateColor } = state.colors;
  const { setTask, setExpandedTask } = setState;
  const { closeModal } = setState.setModal;

  return (
    <React.Fragment>
      <Card
        fluid
        onClick={() => setExpandedTask(!expandedTask)}
        header={
          <TaskMain>
            <TaskTitle>{task.title}</TaskTitle>
            <DeadlineWarningContainer task={task} />

            <TaskColors>
              <Popup
                flowing
                hoverable
                position="right center"
                content={`Status (${taskStates.levels[task.state]})`}
                trigger={<TaskColorBox color={stateColor} />}
              />
              <Popup
                flowing
                hoverable
                position="right center"
                content={`Priority (${task.priority}/10)`}
                trigger={<TaskColorBox color={priorityColor} />}
              />
              <Popup
                flowing
                hoverable
                position="right center"
                content={`Difficulty (${task.difficulty}/10)`}
                trigger={<TaskColorBox color={difficultyColor} />}
              />
            </TaskColors>
          </TaskMain>
        }
        description={expandedTask && task.description}
        meta={expandedTask && formatDateToString(task.dateCreated)}
        extra={
          expandedTask && (
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

const SecondaryProgressBar = ({ color, value, total }) => {
  return (
    <StyledProgressBar
      style={{ margin: "1em 0" }}
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
      <SecondaryProgressBar color={stateColor} value={state} total="2" />
      <SecondaryProgressBar color={priorityColor} value={priority} total="10" />
      <SecondaryProgressBar
        color={difficultyColor}
        value={difficulty}
        total="10"
      />
    </React.Fragment>
  );
};
export default TaskContainer;
