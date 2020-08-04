import React from "react";
import axios from "axios";

import { axiosHeaders } from "../../axiosOptions";
import routes from "../../routes";

const GroupsContext = React.createContext();

function GroupsProvider(props) {
  // Provider for the task groups of a given project
  const emptyGroup = { title: "", description: "" };
  const [groups, setGroups] = React.useState([]);

  const fetchGroups = (projectSlug) => {
    console.log(routes.api.tasks.viewset(projectSlug, 10));
    axios
      .get(routes.api.groups.viewset(projectSlug), axiosHeaders)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.log(error));
  };

  const postGroup = (newGroup, setNewGroup) => {
    axios
      .post(
        routes.api.groups.viewset(newGroup.projectSlug),
        newGroup,
        axiosHeaders
      )
      .then((response) => handlePostSuccess(response.data, setNewGroup))
      .catch((error) => console.log(error));
  };

  const handlePostSuccess = (newGroup, setNewGroup) => {
    setGroups([newGroup, ...groups]);
    setNewGroup(emptyGroup);
  };
  const patchGroup = (group) => {
    axios
      .patch(
        routes.api.groups.detail(group.projectSlug, group.id),
        group,
        axiosHeaders
      )
      .then((response) => handlePatchSuccess(response.data))
      .catch((error) => console.log(error));
  };
  const handlePatchSuccess = (patchedGroup) => {
    const patchedIndex = groups.findIndex((grp) => grp.id === patchedGroup.id);
    const newGroups = [
      ...groups.slice(0, patchedIndex),
      patchedGroup,
      ...groups.slice(patchedIndex + 1),
    ];
    setGroups(newGroups);
  };
  const deleteGroup = (group) => {
    axios
      .delete(
        routes.api.groups.detail(group.projectSlug, group.id),
        axiosHeaders
      )
      .then(() => {
        setGroups(groups.filter((grp) => grp.id !== group.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        setGroups,
        fetchGroups,
        postGroup,
        patchGroup,
        deleteGroup,
      }}
    >
      {props.children}
    </GroupsContext.Provider>
  );
}

export { GroupsContext, GroupsProvider };
