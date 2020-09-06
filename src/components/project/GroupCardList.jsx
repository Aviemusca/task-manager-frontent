import React, { useEffect, useContext } from "react";

import GroupCard from "./GroupCard";

import styled from "styled-components";

import { GroupsContext } from "../contexts/GroupsContext";
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  overflow: overlay;
  align-items: start;
  grid-gap: 3em;
  justify-items: center;
`;

const ProjectCardList = ({ project }) => {
  const { groups, fetchGroups } = useContext(GroupsContext);
  useEffect(() => fetchGroups(project.slug), []);
  return (
    <CardGrid>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </CardGrid>
  );
};

export default ProjectCardList;
