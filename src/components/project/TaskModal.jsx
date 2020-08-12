import React from "react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { Modal, Form, Button } from "semantic-ui-react";
import { TasksContext } from "../contexts/TasksContext";
import { GroupsContext } from "../contexts/GroupsContext";

import { CustomFormContainerLg } from "../common/styles";

const TaskModalContainer = ({
  task,
  setTask,
  open,
  closeModal,
  onProgressChange,
}) => {
  const { patchTask, deleteTask: handleDelete } = React.useContext(
    TasksContext
  );
  const { fetchGroups } = React.useContext(GroupsContext);

  React.useEffect(() => {
    fetchGroups(task.projectSlug);
  }, [task.state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newTask = { ...task };
    newTask[name] = value;
    setTask(newTask);
  };

  const handleDeadlineChange = (event, { name, value }) =>
    setTask({ ...task, deadline: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    patchTask(task);
    closeModal();
  };

  const handlers = {
    handleSubmit,
    handleInputChange,
    handleDeadlineChange,
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

const TaskModal = ({ open, closeModal, task, handlers }) => {
  const states = ["No Progress", "In Progress", "Completed"];
  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>Task Detail</Modal.Header>
      <Modal.Content style={{ margin: "0 2em" }}>
        <Form onSubmit={(event) => handlers.handleSubmit(event)}>
          <CustomFormContainerLg>
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
              label={`State: ${states[task.state]} `}
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
              placeholder="Select a deadline"
              value={task.deadline}
              onChange={handlers.handleDeadlineChange}
            />
            <Button type="submit" primary>
              Update Task
            </Button>

            <Button negative onClick={() => handlers.handleDelete(task)}>
              Delete Task
            </Button>
          </CustomFormContainerLg>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default TaskModalContainer;
