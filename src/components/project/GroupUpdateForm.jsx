import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { GroupsContext } from "../contexts/GroupsContext";

export const GroupUpdateForm = ({ closeModal, projectSlug }) => {
  const { newGroup, setNewGroup, postNewGroup } = useContext(GroupsContext);

  const { title, description } = newGroup;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const group = { ...newGroup };
    group[name] = value;
    setNewGroup(group);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewGroup(projectSlug);
    closeModal();
  };
  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Form.Input
        novalidate
        label="Title"
        type="text"
        name="title"
        placeholder="Enter a task group title"
        value={title}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Form.TextArea
        label="Description"
        type="text"
        name="description"
        placeholder="Enter a task group description"
        value={description}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Button type="submit" primary>
        Add Group
      </Button>
    </Form>
  );
};
