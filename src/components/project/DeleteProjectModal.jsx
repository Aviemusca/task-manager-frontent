import React, { useContext } from "react";
import { Button, Modal } from "semantic-ui-react";

import { ProjectsContext } from "../contexts/ProjectsContext";

import routes from "../../routes";

const DeleteProjectModal = ({
  modalOpen,
  closeModal,
  projectSlug,
  setRedirect,
}) => {
  const { deleteProject } = useContext(ProjectsContext);

  const handleDeleteProject = (projectSlug) => {
    deleteProject(projectSlug);
    closeModal();
    setRedirect(routes.pages.projects.list);
  };
  return (
    <div>
      <Modal open={modalOpen} onClose={closeModal} closeIcon>
        <Modal.Header>Delete Your Project</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your project?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} icon="remove" content="No"></Button>
          <Button
            onClick={() => handleDeleteProject(projectSlug)}
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
