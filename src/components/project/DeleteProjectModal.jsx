import React, { useContext } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext";
import DeleteModal from "../common/deleteModal";

import { Redirect } from "react-router-dom";
import routes from "../../routes";

const DeleteProjectModalContainer = ({
  modalOpen,
  closeModal,
  projectSlug,
}) => {
  const [redirect, setRedirect] = React.useState("");
  const { deleteProject } = useContext(ProjectsContext);

  async function handleDelete() {
    await deleteProject(projectSlug);
    setRedirect(routes.pages.projects.list);
    closeModal();
  }
  return (
    <React.Fragment>
      {redirect && <Redirect to={redirect} />}
      <DeleteProjectModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
    </React.Fragment>
  );
};

const DeleteProjectModal = ({ modalOpen, closeModal, handleDelete }) => {
  return (
    <DeleteModal
      modalOpen={modalOpen}
      closeModal={closeModal}
      resourceName="project"
      onDelete={handleDelete}
    />
  );
};

export default DeleteProjectModalContainer;
