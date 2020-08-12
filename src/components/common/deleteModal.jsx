import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { capitalize } from "../../utils/strings";

const DeleteResourceModal = ({
  modalOpen,
  closeModal,
  resourceName,
  onDelete,
}) => {
  return (
    <div>
      <Modal open={modalOpen} onClose={closeModal} closeIcon>
        <Modal.Header>Delete{capitalize(resourceName)}</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this{capitalize(resourceName)}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} icon="remove" content="No"></Button>
          <Button
            onClick={onDelete}
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

export default DeleteResourceModal;
