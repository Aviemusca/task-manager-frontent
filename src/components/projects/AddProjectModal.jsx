import React from "react";
import { Modal } from "semantic-ui-react";
import { ProjectForm } from "./ProjectForm";
import { CustomFormContainerLg, CustomFormTitle } from "../common/styles";

const AddProjectModal = ({
  handleModalClose,
  handleSubmit,
  handleInputChange,
  newProject,
}) => {
  return (
    <Modal
      dimmer="blurring"
      open={newProject.required}
      onClose={handleModalClose}
    >
      <Modal.Content>
        <CustomFormContainerLg>
          <CustomFormTitle>New Project</CustomFormTitle>
          <ProjectForm
            handleSubmit={(event) => handleSubmit(event)}
            handleInputChange={(event) => handleInputChange(event)}
            newProject={newProject}
          />
        </CustomFormContainerLg>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

export default AddProjectModal;
