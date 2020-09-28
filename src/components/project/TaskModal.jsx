import React from "react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { Modal, Form, Button } from "semantic-ui-react";
import { TasksContext } from "../contexts/TasksContext";

import { CustomFormContainerLg, CustomFormTitle } from "../common/styles";

const TaskModalContainer = ({ task, setTask, open, closeModal }) => {
  const { patchTask, deleteTask: handleDelete } = React.useContext(
    TasksContext
  );

  const handlers = {
    handleInputChange(event) {
      const { name, value } = event.target;
      const newTask = { ...task };
      newTask[name] = value;
      setTask(newTask);
    },
    handleSubmit(event) {
      event.preventDefault();
      patchTask(task);
      closeModal();
    },
    handleDeadlineChange(event, { name, value }) {
      setTask({ ...task, deadline: value });
    },
    handleDelete,
  };

  return (
    <TaskModal
      open={open}
      closeModal={closeModal}
      task={task}
      handlers={handlers}
    />
  );
};

const TaskModalClientContainer = ({ task, setTask, open, closeModal }) => {
  // Task modal for client-side / no backend api calls
  const handlers = {
    handleInputChange(event) {
      const { name, value } = event.target;
      const newTask = { ...task };
      newTask[name] = value;
      setTask(newTask);
    },
    handleSubmit(event) {
      event.preventDefault();
      closeModal();
    },
    handleDeadlineChange(event, { name, value }) {
      setTask({ ...task, deadline: value });
    },
  };

  return (
    <TaskModalClient
      open={open}
      closeModal={closeModal}
      task={task}
      handlers={handlers}
    />
  );
};

const TaskModalClient = ({ open, closeModal, task, handlers }) => (
  <Modal open={open} onClose={closeModal} closeIcon>
    <Modal.Content style={{ margin: "0" }}>
      <TaskForm task={task} handlers={handlers} buttons={<ButtonsClient />} />
    </Modal.Content>
  </Modal>
);

const TaskModal = ({ open, closeModal, task, handlers }) => {
  return (
    <Modal open={open} onClose={closeModal} closeIcon>
      <Modal.Content style={{ margin: "0" }}>
        <TaskForm
          task={task}
          handlers={handlers}
          buttons={<Buttons handlers={handlers} task={task} />}
        />
      </Modal.Content>
    </Modal>
  );
};

const TaskForm = ({ task, handlers, buttons }) => {
  const states = ["Not Started", "In Progress", "Completed"];
  return (
    <Form onSubmit={(event) => handlers.handleSubmit(event)}>
      <CustomFormContainerLg>
        <CustomFormTitle>Edit Task</CustomFormTitle>
        <Form.Input
          label="Title"
          type="text"
          name="title"
          value={task.title}
          placeholder="Enter a new task"
          onChange={(event) => handlers.handleInputChange(event)}
          required
        />
        <Form.TextArea
          label="Description"
          type="text"
          name="description"
          placeholder="Enter a task description"
          value={task.description}
          onChange={(event) => handlers.handleInputChange(event)}
        />
        <Form.Input
          label={`Priority: ${task.priority} `}
          min={1}
          max={10}
          name="priority"
          onChange={handlers.handleInputChange}
          step={1}
          type="range"
          value={task.priority}
        />
        <Form.Input
          label={`Difficulty: ${task.difficulty} `}
          min={1}
          max={10}
          name="difficulty"
          onChange={handlers.handleInputChange}
          step={1}
          type="range"
          value={task.difficulty}
        />
        <Form.Input
          label={`Status: ${states[task.state]} `}
          min={0}
          max={2}
          name="state"
          onChange={handlers.handleInputChange}
          step={1}
          type="range"
          value={task.state}
        />

        <DateTimeInput
          label="Deadline"
          name="deadline"
          iconPosition="left"
          dateFormat="YYYY-MM-DD"
          timeFormat="24"
          divider="  "
          placeholder="Select a deadline"
          value={task.deadline}
          onChange={handlers.handleDeadlineChange}
        />
        {buttons}
      </CustomFormContainerLg>
    </Form>
  );
};

const Buttons = ({ handlers, task }) => (
  <React.Fragment>
    <Button type="submit" primary>
      Update Task
    </Button>

    <Button negative onClick={() => handlers.handleDelete(task)}>
      Delete Task
    </Button>
  </React.Fragment>
);
const ButtonsClient = () => (
  <Button type="submit" primary>
    Done
  </Button>
);
export default TaskModalContainer;
export { TaskModalClientContainer as TaskModalClient };
