import React from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteProjectModal = ({
  onModalClose,
  onDeleteProject,
  deleteProject,
}) => {
  return (
    <div>
      <Modal
        dimmer="blurring"
        open={deleteProject}
        onClose={onModalClose}
        closeIcon
      >
        <Modal.Header>Delete Your Project</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your project?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onModalClose} icon="remove" content="No"></Button>
          <Button
            onClick={onDeleteProject}
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

export default DeleteProjectModal;
