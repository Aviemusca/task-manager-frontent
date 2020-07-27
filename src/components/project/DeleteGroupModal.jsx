import React, { useContext } from "react";
import { Button, Modal } from "semantic-ui-react";

import { GroupsContext } from "../contexts/GroupsContext";

import routes from "../../routes";

const DeleteGroupModal = ({ modalOpen, closeModal, group }) => {
  const { deleteGroup } = useContext(GroupsContext);

  const handleDeleteGroup = () => {
    deleteGroup(group);
    closeModal();
  };
  return (
    <div>
      <Modal open={modalOpen} onClose={closeModal} closeIcon>
        <Modal.Header>Delete Task Group</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this task group?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} icon="remove" content="No"></Button>
          <Button
            onClick={handleDeleteGroup}
            color="red"
            labelPosition="right"
            icon="checkmark"
            content="Yes, delete!"
          ></Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default DeleteGroupModal;
