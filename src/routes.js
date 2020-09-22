const baseServerUrl = "http://tamska-backend.herokuapp.com/";

const baseClientProjectsUrl = "/projects/";

const baseServerProjectsUrl = baseServerUrl + "projects/";
const baseServerContactsUrl = baseServerUrl + "contacts/";
const baseServerAccountsUrl = baseServerUrl + "accounts/";

const serverProjectDetailUrl = (projectSlug) =>
  `${routes.api.projects.viewset}${projectSlug}/`;

const clientProjectDetailUrl = (projectSlug) =>
  `${routes.pages.projects.list}${projectSlug}/`;

const projectTasksViewsetUrl = (projectSlug) =>
  `${baseServerProjectsUrl}${projectSlug}/tasks/project-task-viewset/`;

const projectTasksDetailUrl = (projectSlug, taskId) =>
  `${baseServerProjectsUrl}${projectSlug}/tasks/project-task-viewset/${taskId}/`;

const urlWrapper = (left, right) => {
  // partial to wrap a middle arg and form endpoint urls
  const wrapperFunction = (middle) => left + middle + right;
  return wrapperFunction;
};

// Expects project slug as argument
const groupUrlWrapper = urlWrapper(baseServerProjectsUrl, "/groups/viewset/");

// Expects project slug and group pk as arguments
const groupDetail = (projectSlug, groupPk) =>
  `${groupUrlWrapper(projectSlug)}${groupPk}/`;

const taskUrlWrapper = (projectSlug, groupPk) => {
  const baseGroupUrl = urlWrapper(baseServerProjectsUrl, "/groups/");
  const baseTaskUrl = urlWrapper(baseGroupUrl(projectSlug), "/tasks/viewset/");
  return baseTaskUrl(groupPk);
};

const taskDetail = (projectSlug, groupPk, taskPk) =>
  `${taskUrlWrapper(projectSlug, groupPk)}${taskPk}/`;

const routes = {
  pages: {
    home: "/",
    about: "/about/",
    contact: "/contact/",
    projects: {
      list: baseClientProjectsUrl,
      detail: clientProjectDetailUrl,
    },
    addProject: "/new-project/",
    login: "/login/",
    signup: "/signup/",
  },
  api: {
    accounts: {
      viewset: baseServerAccountsUrl + "viewset/",
      authToken: baseServerAccountsUrl + "auth-token/",
    },
    contacts: {
      create: baseServerContactsUrl + "create/",
    },
    projects: {
      viewset: baseServerProjectsUrl + "viewset/",
      detail: serverProjectDetailUrl,
    },
    groups: {
      viewset: groupUrlWrapper,
      detail: groupDetail,
    },
    tasks: {
      viewset: taskUrlWrapper,
      detail: taskDetail,
      projectViewset: projectTasksViewsetUrl,
      projectDetail: projectTasksDetailUrl,
    },
  },
};

export default routes;
