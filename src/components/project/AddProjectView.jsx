import React from "react";
import { CustomFormContainerMd, CustomFormTitle } from "../common/styles";
import { ProjectForm } from "./ProjectForm";

const AddProjectView = () => (
  <CustomFormContainerMd>
    <CustomFormTitle>New Project</CustomFormTitle>
    <ProjectForm />
  </CustomFormContainerMd>
);

export default AddProjectView;
