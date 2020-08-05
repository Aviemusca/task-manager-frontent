import React from "react";
import axios from "axios";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { Modal, Icon, Form, Button } from "semantic-ui-react";

import routes from "../../routes";
import { axiosHeaders } from "../../axiosOptions";
import moment from "moment";
import { CustomFormContainerLg } from "../common/styles";

const TaskModalContainer = ({
  task,
  setTask,
  tasks,
  setTasks,
  open,
  closeModal,
}) => {
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
    patchTask();
    closeModal();
  };

  const patchTask = () => {
    axios
      .patch(
        routes.api.tasks.detail(task.projectSlug, task.groupId, task.id),
        task,
        axiosHeaders
      )
      .then((response) => setTask(response.data))
      .catch((error) => console.log(error));
  };
  const deleteTask = () => {
    axios
      .delete(
        routes.api.tasks.detail(task.projectSlug, task.groupId, task.id),
        axiosHeaders
      )
      .then(() => {
        setTasks(tasks.filter((tsk) => tsk.id !== task.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <TaskModal
      open={open}
      closeModal={closeModal}
      task={task}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleDeadlineChange={handleDeadlineChange}
      onDelete={deleteTask}
    />
  );
};

const TaskModal = ({
  open,
  closeModal,
  task,
  handleSubmit,
  handleInputChange,
  handleDeadlineChange,
  onDelete,
}) => {
  const states = ["No Progress", "In Progress", "Completed"];
  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Header style={{ textAlign: "center" }}>Task Detail</Modal.Header>
      <Modal.Content style={{ margin: "0 2em" }}>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <CustomFormContainerLg>
            <Form.Input
              label="Title"
              type="text"
              name="title"
              value={task.title}
              placeholder="Enter a new task"
              onChange={(event) => handleInputChange(event)}
              required
            />
            <Form.TextArea
              label="Description"
              type="text"
              name="description"
              placeholder="Enter a task description"
              value={task.description}
              onChange={(event) => handleInputChange(event)}
            />

            <Form.Input
              label={`Priority: ${task.priority} `}
              min={1}
              max={10}
              name="priority"
              onChange={handleInputChange}
              step={1}
              type="range"
              value={task.priority}
            />
            <Form.Input
              label={`Difficulty: ${task.difficulty} `}
              min={1}
              max={10}
              name="difficulty"
              onChange={handleInputChange}
              step={1}
              type="range"
              value={task.difficulty}
            />
            <Form.Input
              label={`State: ${states[task.state]} `}
              min={0}
              max={2}
              name="state"
              onChange={handleInputChange}
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
              onChange={handleDeadlineChange}
            />
            <Button type="submit" primary>
              Update Task
            </Button>

            <Button negative onClick={onDelete}>
              Delete Task
            </Button>
          </CustomFormContainerLg>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default TaskModalContainer;
