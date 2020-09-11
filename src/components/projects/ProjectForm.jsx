import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";

import { ProjectsContext } from "../contexts/ProjectsContext";

export const ProjectForm = ({ closeModal }) => {
  const { newProject, setNewProject, postNewProject } = useContext(
    ProjectsContext
  );
  const { title, description, deadline } = newProject;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const project = { ...newProject };
    project[name] = value;
    setNewProject(project);
  };
  const handleDeadlineChange = (event, { name, value }) => {
    setNewProject({ ...newProject, deadline: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewProject();
    closeModal();
  };
  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Input
        novalidate
        label="Title"
        type="text"
        name="title"
        placeholder="Enter a project title"
        value={title}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Form.TextArea
        label="Description"
        type="text"
        name="description"
        placeholder="Enter a project description"
        value={description}
        onChange={(event) => handleInputChange(event)}
        required
      />

      <DateTimeInput
        label="Deadline"
        name="deadline"
        iconPosition="left"
        dateFormat="YYYY-MM-DD"
        timeFormat="24"
        placeholder="Select a deadline"
        value={deadline}
        onChange={handleDeadlineChange}
      />
      <Button type="submit" primary>
        Create
      </Button>
    </Form>
  );
};
