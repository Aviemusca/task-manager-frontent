import React, { useState, createContext } from "react";

const ProjectsContext = createContext();

const ProjectsProvider = (props) => {
  const [projects, setProjects] = useState({ name: "yvan", age: 30 });
  return (
    <ProjectsContext.Provider value={projects}>
      {props.children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext, ProjectsProvider };
