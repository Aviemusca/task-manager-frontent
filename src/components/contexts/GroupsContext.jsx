import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

import axiosOptions from "../../axiosOptions";
import routes from "../../routes";

const GroupsContext = createContext();

function GroupsProvider(props) {
  // Provider for the task groups of a given project
  const initialNewGroup = { title: "", description: "" };
  const initialProject = { title: "", description: "" };

  // The project to which the groups belong
  const [project, setProject] = useState(initialProject);
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState(initialNewGroup);

  useEffect(() => {
    console.log(props);
  }, []);
  // Re-fetch groups when new group added, as slug created server side
  //  useEffect(() => {
  //    fetchGroups();
  //  }, [groups.length]);
  //
  const fetchGroups = (projectSlug) => {
    console.log(project);
    const axiosGetOptions = axiosOptions;
    axiosGetOptions.method = "GET";
    axiosGetOptions.url = routes.api.groups.viewset(projectSlug);

    axios(axiosGetOptions)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.log(error));
  };

  const resetNewGroup = () => {
    setNewGroup(initialNewGroup);
  };

  const postNewGroup = (projectSlug) => {
    const axiosPostOptions = axiosOptions;
    axiosPostOptions.method = "POST";
    axiosPostOptions.url = routes.api.groups.viewset(projectSlug);
    axiosPostOptions.data = newGroup;
    axios(axiosPostOptions)
      .then(() => {
        setGroups([newGroup, ...groups]);
      })
      .catch((error) => console.log(error));
  };

  const deleteGroup = (projectSlug, groupPk) => {
    const axiosDeleteOptions = axiosOptions;
    axiosDeleteOptions.method = "DELETE";
    axiosDeleteOptions.url = routes.api.groups.detail(projectSlug, groupPk);
    axios(axiosDeleteOptions)
      .then(() => {
        setGroups(groups.filter((group) => group.pk !== groupPk));
      })
      .catch((error) => console.log(error));
  };

  return (
    <GroupsContext.Provider
      value={{
        project,
        setProject,
        groups,
        setGroups,
        newGroup,
        setNewGroup,
        resetNewGroup,
        fetchGroups,
        postNewGroup,
        deleteGroup,
      }}
    >
      {props.children}
    </GroupsContext.Provider>
  );
}

export { GroupsContext, GroupsProvider };
