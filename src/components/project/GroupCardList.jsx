import React, { useEffect, useContext } from "react";

import GroupCard from "./GroupCard";

import { CardGrid } from "./Styles";

import { GroupsContext } from "../contexts/GroupsContext";

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
