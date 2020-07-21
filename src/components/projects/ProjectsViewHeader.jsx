import React, { useContext, useState } from "react";

import AddProjectModal from "./AddProjectModal";

import { ProjectsContext } from "../contexts/ProjectsContext";

import { Button } from "semantic-ui-react";
import { Header, HeaderTitle } from "./ProjectStyles";

const ProjectsViewHeader = () => {
  const { resetNewProject } = useContext(ProjectsContext);
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  const injectAddProjectModal = () => {
    if (addProjectModalOpen)
      return (
        <AddProjectModal
          modalOpen={addProjectModalOpen}
          closeModal={closeAddProjectModal}
        />
      );
  };

  const handleAddProject = () => {
    resetNewProject();
    openAddProjectModal();
  };

  const openAddProjectModal = () => {
    setAddProjectModalOpen(true);
  };

  const closeAddProjectModal = () => {
    setAddProjectModalOpen(false);
  };

  return (
    <Header>
      {injectAddProjectModal()}
      <HeaderTitle>My Projects</HeaderTitle>
      <Button
        onClick={handleAddProject}
        basic
        color="violet"
        content="Add project"
      />
    </Header>
  );
};

export default ProjectsViewHeader;
