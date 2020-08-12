import React from "react";
import { Modal } from "semantic-ui-react";
import { UpdateGroupForm } from "./UpdateGroupForm";
import { CustomFormContainerLg, CustomFormTitle } from "../common/styles";

const UpdateGroupModal = ({ closeModal, group }) => {
  return (
    <Modal open onClose={closeModal}>
      <Modal.Content>
        <CustomFormContainerLg>
          <CustomFormTitle>Edit Task Group</CustomFormTitle>
          <UpdateGroupForm closeModal={closeModal} group={group} />
        </CustomFormContainerLg>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

export default UpdateGroupModal;
