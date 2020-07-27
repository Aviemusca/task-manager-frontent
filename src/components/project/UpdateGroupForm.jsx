import React from "react";
import { Form, Button } from "semantic-ui-react";

import { GroupsContext } from "../contexts/GroupsContext";

export const UpdateGroupForm = ({ closeModal, group }) => {
  const { patchGroup } = React.useContext(GroupsContext);
  const [patchedGroup, setPatchedGroup] = React.useState(group);

  const { title, description } = { ...patchedGroup };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newGroup = { ...patchedGroup };
    newGroup[name] = value;
    setPatchedGroup(newGroup);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchGroup(patchedGroup);
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
