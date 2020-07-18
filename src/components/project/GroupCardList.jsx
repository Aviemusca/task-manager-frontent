import React from "react";

import GroupCard from "./GroupCard";

import { CardGrid } from "./Styles";

const ProjectCardList = ({ groups }) => {
  return (
    <CardGrid>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </CardGrid>
  );
};

export default ProjectCardList;
