import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { ProjectTitle } from "./Styles";
import { Button } from "semantic-ui-react";

import DeleteProjectModal from "./DeleteProjectModal";
import AddGroupModal from "./AddGroupModal";

import { GroupsContext } from "../contexts/GroupsContext";

const Header = ({ project }) => {
  const { resetNewGroup } = useContext(GroupsContext);
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const [addGroupModalOpen, setAddGroupModalOpen] = useState(false);
  const [redirect, setRedirect] = useState("");
  const { title } = project;

  const injectRedirect = () => {
    // Used to redirect to projects after deleting a project
    if (redirect) return <Redirect to={redirect} />;
  };

  const injectDeleteProjectModal = () => {
    if (deleteProjectModalOpen)
      return (
        <DeleteProjectModal
          modalOpen={deleteProjectModalOpen}
          closeModal={() => setDeleteProjectModalOpen(false)}
          setRedirect={setRedirect}
          projectSlug={project.slug}
        />
      );
  };
  const injectAddGroupModal = () => {
    if (addGroupModalOpen)
      return (
        <AddGroupModal
          modalOpen={addGroupModalOpen}
          closeModal={() => setAddGroupModalOpen(false)}
          projectSlug={project.slug}
        />
      );
  };
  const handleAddGroup = () => {
    resetNewGroup();
    setAddGroupModalOpen(true);
  };
  return (
    <React.Fragment>
      {injectRedirect()}
      {injectDeleteProjectModal()}
      {injectAddGroupModal()}
      <ProjectTitle>{title}</ProjectTitle>
      <Button primary onClick={handleAddGroup}>
        Add Task Group
      </Button>
      <Button primary onClick={() => setDeleteProjectModalOpen(true)}>
        Delete Project
      </Button>
    </React.Fragment>
  );
};

export default Header;
