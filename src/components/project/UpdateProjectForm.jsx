import React from "react";
import { Form, Button } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";

import { ProjectsContext } from "../contexts/ProjectsContext";

export const UpdateProjectForm = ({ closeModal, project }) => {
  const { patchProject } = React.useContext(ProjectsContext);
  const [patchedProject, setPatchedProject] = React.useState(project);

  const { title, description, deadline } = { ...patchedProject };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newProject = { ...patchedProject };
    newProject[name] = value;
    setPatchedProject(newProject);
  };
  const handleDeadlineChange = (event, { name, value }) => {
    const newProject = { ...patchedProject };
    setPatchedProject({ ...newProject, deadline: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchProject(patchedProject);
    closeModal();
  };
  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Input
        novalidate
        label="Title"
        type="text"
        name="title"
        value={title}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Form.TextArea
        label="Description"
        type="text"
        name="description"
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
        Update
      </Button>
    </Form>
  );
};
