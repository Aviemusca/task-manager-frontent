import React from "react";
import { Modal } from "semantic-ui-react";
import TaskSortWidget from "./TaskSortWidget";

const SortModal = ({
  modalOpen,
  closeModal,
  sortPropIndices,
  setSortPropIndices,
}) => {
  return (
    <Modal open={modalOpen} onClose={closeModal} closeIcon>
      <Modal.Content>
        <TaskSortWidget
          sortPropIndices={sortPropIndices}
          setSortPropIndices={setSortPropIndices}
        />
      </Modal.Content>
    </Modal>
  );
};

export default SortModal;