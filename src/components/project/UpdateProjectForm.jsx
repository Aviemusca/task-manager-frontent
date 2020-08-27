import React from "react";
import { Form, Button } from "semantic-ui-react";

import { ProjectsContext } from "../contexts/ProjectsContext";

export const UpdateProjectForm = ({ closeModal, project }) => {
  const { patchProject } = React.useContext(ProjectsContext);
  const [patchedProject, setPatchedProject] = React.useState(project);

  const { title, description } = { ...patchedProject };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newProject = { ...patchedProject };
    newProject[name] = value;
    setPatchedProject(newProject);
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
      <Button type="submit" primary>
        Update
      </Button>
    </Form>
  );
};
