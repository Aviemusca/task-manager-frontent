import React from "react";
import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import TaskSortWidget from "./TaskSortWidget";

const StyledModalContent = styled(Modal.Content)`
  background-color: #777;
`;

const SortModal = ({ modalOpen, closeModal, sortProps, setSortProps }) => {
  return (
    <Modal open={modalOpen} onClose={closeModal} closeIcon>
      <StyledModalContent>
        <TaskSortWidget sortProps={sortProps} setSortProps={setSortProps} />
      </StyledModalContent>
    </Modal>
  );
};

export default SortModal;
