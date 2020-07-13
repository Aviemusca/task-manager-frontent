import React from "react";
import { Form, Button } from "semantic-ui-react";

export const ProjectForm = ({
  handleInputChange,
  handleSubmit,
  newProject,
}) => {
  const { title, description } = newProject;
  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Input
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
      <Button type="submit" primary>
        Add Project
      </Button>
    </Form>
  );
};
