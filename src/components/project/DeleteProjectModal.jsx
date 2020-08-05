import React, { useContext } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext";
import DeleteModal from "../common/deleteModal";

import routes from "../../routes";

const DeleteProjectModal = ({
  modalOpen,
  closeModal,
  projectSlug,
  setRedirect,
}) => {
  const { deleteProject } = useContext(ProjectsContext);

  const handleDeleteProject = () => {
    deleteProject(projectSlug);
    closeModal();
    setRedirect(routes.pages.projects.list);
  };
  return (
    <DeleteModal
      modalOpen={modalOpen}
      closeModal={closeModal}
      resourceName="project"
      onDelete={handleDeleteProject}
    />
  );
};

export default DeleteProjectModal;
