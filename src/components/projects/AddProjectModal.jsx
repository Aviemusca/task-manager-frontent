import React from "react";
import { Modal } from "semantic-ui-react";
import { ProjectForm } from "./ProjectForm";
import { ProjectFormContainer, ProjectFormTitle } from "./ProjectStyles";

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
        <ProjectFormContainer>
          <ProjectFormTitle>New Project</ProjectFormTitle>
          <ProjectForm
            handleSubmit={(event) => handleSubmit(event)}
            handleInputChange={(event) => handleInputChange(event)}
            newProject={newProject}
          />
        </ProjectFormContainer>
      </Modal.Content>
      <Modal.Description></Modal.Description>
    </Modal>
  );
};

export default AddProjectModal;
