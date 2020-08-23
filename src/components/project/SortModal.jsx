import React from "react";
import { Modal } from "semantic-ui-react";
import TaskSortWidget from "./TaskSortWidget";

const SortModalContainer = ({ modalOpen, closeModal, project }) => {
  return (
    <SortModal
      modalOpen={modalOpen}
      closeModal={closeModal}
      project={project}
    />
  );
};

const SortModal = ({ modalOpen, closeModal, project }) => {
  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Modal.Content>
        <TaskSortWidget project={project} />
      </Modal.Content>
    </Modal>
  );
};

export default SortModalContainer;
