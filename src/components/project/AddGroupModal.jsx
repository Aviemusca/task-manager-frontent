import React from "react";
import { Modal } from "semantic-ui-react";
import { GroupForm } from "./GroupForm";
import { CustomFormContainerLg, CustomFormTitle } from "../common/styles";

const AddGroupModal = ({ modalOpen, closeModal, projectSlug }) => {
  return (
    <Modal dimmer="blurring" open={modalOpen} onClose={closeModal}>
      <Modal.Content>
        <CustomFormContainerLg>
          <CustomFormTitle>New Task Group</CustomFormTitle>
          <GroupForm closeModal={closeModal} projectSlug={projectSlug} />
        </CustomFormContainerLg>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

export default AddGroupModal;
