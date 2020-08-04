import React from "react";
import axios from "axios";
import routes from "../../routes";
import { axiosHeaders } from "../../axiosOptions";
import { Modal, Radio, Form, Button } from "semantic-ui-react";
import { CustomFormContainerLg } from "../common/styles";

const TaskModalContainer = ({ task, setTask, open, closeModal }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newTask = { ...task };
    newTask[name] = value;
    setTask(newTask);
  };

  const handleStateChange = (event, { value }) => {
    setTask({ ...task, state: parseInt(value) });
  };

  const handlePriorityChange = (event, { value }) => {
    setTask({ ...task, priority: parseInt(value) });
  };

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

  return (
    <TaskModal
      open={open}
      closeModal={closeModal}
      task={task}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleStateChange={handleStateChange}
      handlePriorityChange={handlePriorityChange}
    />
  );
};

const TaskModal = ({
  open,
  closeModal,
  task,
  handleSubmit,
  handleInputChange,
  handleStateChange,
  handlePriorityChange,
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
              onChange={handlePriorityChange}
              step={1}
              type="range"
              value={task.priority}
            />
            <Form.Group inline>
              <label>State</label>
              {states.map((state, index) => {
                return (
                  <Form.Field
                    control={Radio}
                    label={state}
                    value={index}
                    checked={task.state === index}
                    onChange={handleStateChange}
                  />
                );
              })}
            </Form.Group>
            <Button type="submit" primary>
              Update Task
            </Button>
          </CustomFormContainerLg>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default TaskModalContainer;
