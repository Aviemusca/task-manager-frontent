import React, { useContext } from "react";
import { Button, Modal } from "semantic-ui-react";

import { GroupsContext } from "../contexts/GroupsContext";
import DeleteModal from "../common/deleteModal";

const DeleteGroupModal = ({ modalOpen, closeModal, group }) => {
  const { deleteGroup } = useContext(GroupsContext);

  const handleDeleteGroup = () => {
    deleteGroup(group);
    closeModal();
  };
  return (
    <DeleteModal
      modalOpen={modalOpen}
      closeModal={closeModal}
      resourceName="task group"
      onDelete={handleDeleteGroup}
    />
  );
};

export default DeleteGroupModal;
