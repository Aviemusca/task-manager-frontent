import React from "react";
import styled from "styled-components";
import { Card, Popup } from "semantic-ui-react";
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
  const [priorityColor, setPriorityColor] = React.useState([]);
  const [stateColor, setStateColor] = React.useState([]);
  const [difficultyColor, setDifficultyColor] = React.useState([]);
  const [expandedTask, setExpandedTask] = React.useState(false);

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

const Task = ({ state, setState }) => {
  const { task, expandedTask, modalOpen } = state;
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
