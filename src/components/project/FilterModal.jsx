import React from "react";
import { Modal } from "semantic-ui-react";
import TaskFilterWidget from "./TaskFilterWidget";

const FilterModal = ({
  modalOpen,
  closeModal,
  filterProps,
  setFilterProps,
}) => {
  return (
    <Modal open={modalOpen} onClose={closeModal} closeIcon>
      <Modal.Content>
        <TaskFilterWidget
          filterProps={filterProps}
          setFilterProps={setFilterProps}
        />
      </Modal.Content>
    </Modal>
  );
};

export default FilterModal;
