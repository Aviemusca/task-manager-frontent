import React from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";
import { getPriorityColor, getStateColor } from "../../taskOptions";

const Container = styled.div`
  display: flex;
  background: linear-gradient(
    to right,
    rgba(${(props) => `${props.stateColor}`}) 0%,
    rgba(${(props) => `${props.stateColor}`}) 20%,
    var(--project-container-color) 20%,
    var(--project-container-color) 80%,
    rgba(${(props) => `${props.priorityColor}`}) 80%,
    rgba(${(props) => `${props.priorityColor}`}) 100%
  );
  padding: 1em 1em;
  margin: 0.5em auto;
  font-size: 1.25em;
  border-radius: 5px;
  border: solid 1px #aaa;
  text-align: center;
`;

const TaskContainer = ({ tsk }) => {
  const [task, setTask] = React.useState(tsk);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [priorityColor, setPriorityColor] = React.useState([]);
  const [stateColor, setStateColor] = React.useState([]);

  React.useEffect(() => {
    setPriorityColor(getPriorityColor(task.priority));
  }, [task.priority]);

  React.useEffect(() => {
    setStateColor(getStateColor(task.state));
  }, [task.state]);

  const closeModal = () => setModalOpen(false);

  return (
    <div onClick={() => setModalOpen(true)}>
      <Task
        task={task}
        setTask={setTask}
        modalOpen={modalOpen}
        closeModal={closeModal}
        priorityColor={priorityColor}
        stateColor={stateColor}
      />
    </div>
  );
};

const Task = ({
  task,
  setTask,
  modalOpen,
  closeModal,
  priorityColor,
  stateColor,
}) => {
  return (
    <div>
      <Container priorityColor={priorityColor} stateColor={stateColor}>
        {task.title}
      </Container>
      {modalOpen && (
        <TaskModal
          task={task}
          setTask={setTask}
          open={modalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default TaskContainer;
