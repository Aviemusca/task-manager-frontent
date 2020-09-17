import React from "react";
import { Modal } from "semantic-ui-react";
import { ProjectForm } from "../project/ProjectForm";
import { CustomFormContainerLg, CustomFormTitle } from "../common/styles";

const AddProjectModal = ({ modalOpen, closeModal }) => {
  return (
    <Modal open={modalOpen} onClose={closeModal} closeIcon>
      <Modal.Content>
        <CustomFormContainerLg>
          <CustomFormTitle>New Project</CustomFormTitle>
          <ProjectForm closeModal={closeModal} />
        </CustomFormContainerLg>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

export default AddProjectModal;
