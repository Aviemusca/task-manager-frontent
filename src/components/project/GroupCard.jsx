import React from "react";
import { Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import UpdateGroupModal from "./UpdateGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";

import routes from "../../routes";

const Card = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
  padding: 1em;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 0.5em;
  border-bottom: solid 1px #bbb;
`;

const Title = styled.h2`
  width: 60%;
  margin-bottom: 0;
`;

const CardSubTitle = styled.h4`
  text-color: #777;
`;

const CardDescription = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const GroupCard = ({ group }) => {
  const { title, dateCreated, description } = group;
  console.log(group);
  const [editMode, setEditMode] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);

  const injectUpdateGroupModal = () => {
    if (editMode)
      return (
        <UpdateGroupModal
          modalOpen={editMode}
          closeModal={() => setEditMode(false)}
          group={group}
        />
      );
  };
  const injectDeleteGroupModal = () => {
    if (deleteMode)
      return (
        <DeleteGroupModal
          modalOpen={deleteMode}
          closeModal={() => setDeleteMode(false)}
          group={group}
        />
      );
  };
  return (
    <Card>
      <Header>
        <Title>{title}</Title>
        <span>
          <Button
            icon
            background="transparent"
            size="mini"
            onClick={() => setEditMode(true)}
          >
            <Icon name="edit" />
          </Button>
          <Button
            icon
            inverted
            color="red"
            background="transparent"
            size="mini"
            onClick={() => setDeleteMode(true)}
          >
            <Icon name="trash" />
          </Button>
        </span>
      </Header>
      {injectUpdateGroupModal()}
      {injectDeleteGroupModal()}
    </Card>
  );
};

export default GroupCard;
