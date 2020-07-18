import React from "react";
import { Modal } from "semantic-ui-react";
import { GroupForm } from "./GroupForm";
import { CustomFormContainerLg, CustomFormTitle } from "../common/styles";

const AddGroupModal = ({ onModalClose, onSubmit, onInputChange, newGroup }) => {
  return (
    <Modal dimmer="blurring" open={newGroup.required} onClose={onModalClose}>
      <Modal.Content>
        <CustomFormContainerLg>
          <CustomFormTitle>New Task Group</CustomFormTitle>
          <GroupForm
            onSubmit={onSubmit}
            onInputChange={onInputChange}
            newGroup={newGroup}
          />
        </CustomFormContainerLg>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

export default AddGroupModal;
