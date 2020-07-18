import React from "react";
import { Form, Button } from "semantic-ui-react";

export const GroupForm = ({ onSubmit, onInputChange, newGroup }) => {
  const { title, description } = newGroup;
  return (
    <Form onSubmit={(event) => onSubmit(event)}>
      <Form.Input
        novalidate
        label="Title"
        type="text"
        name="title"
        placeholder="Enter a task group title"
        value={title}
        onChange={(event) => onInputChange(event)}
        required
      />
      <Form.TextArea
        label="Description"
        type="text"
        name="description"
        placeholder="Enter a task group description"
        value={description}
        onChange={(event) => onInputChange(event)}
        required
      />
      <Button type="submit" primary>
        Add Group
      </Button>
    </Form>
  );
};
