import React from "react";
import { Modal, Loader } from "semantic-ui-react";

const Loading = ({ active }) => (
  <Modal open={active}>
    <Loader>Loading</Loader>
  </Modal>
);

export default Loading;
