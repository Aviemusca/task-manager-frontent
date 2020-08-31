import React from "react";
import { Modal } from "semantic-ui-react";
import TaskSortWidget from "./TaskSortWidget";

const SortModal = ({ modalOpen, closeModal, sortProps, setSortProps }) => {
  return (
    <Modal open={modalOpen} onClose={closeModal} closeIcon>
      <Modal.Content>
        <TaskSortWidget sortProps={sortProps} setSortProps={setSortProps} />
      </Modal.Content>
    </Modal>
  );
};

export default SortModal;
