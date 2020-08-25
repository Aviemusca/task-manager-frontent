import React from "react";
import { Modal } from "semantic-ui-react";
import TaskSortWidget from "./TaskSortWidget";

const SortModalContainer = ({
  modalOpen,
  closeModal,
  project,
  sortPropIndices,
  setSortPropIndices,
}) => {
  return (
    <SortModal
      modalOpen={modalOpen}
      closeModal={closeModal}
      project={project}
      sortPropIndices={sortPropIndices}
      setSortPropIndices={setSortPropIndices}
    />
  );
};

const SortModal = ({
  modalOpen,
  closeModal,
  project,
  sortPropIndices,
  setSortPropIndices,
}) => {
  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Modal.Content>
        <TaskSortWidget
          project={project}
          sortPropIndices={sortPropIndices}
          setSortPropIndices={setSortPropIndices}
        />
      </Modal.Content>
    </Modal>
  );
};

export default SortModalContainer;
