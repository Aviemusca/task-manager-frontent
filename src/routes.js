const baseServerUrl = "http://localhost:8000/";

const baseClientProjectsUrl = "/projects/";

const baseServerProjectsUrl = baseServerUrl + "projects/";
const baseServerAccountsUrl = baseServerUrl + "accounts/";

const serverProjectDetailUrl = (projectSlug) =>
  `${routes.api.projects.viewset}${projectSlug}/`;

const clientProjectDetailUrl = (projectSlug) =>
  `${routes.pages.projects.list}${projectSlug}/`;

const urlWrapper = (left, right) => {
  // partial to wrap a middle arg and form endpoint urls
  const wrapperFunction = (middle) => left + middle + right;
  return wrapperFunction;
};

const groupUrlWrapper = urlWrapper(baseServerProjectsUrl, "/groups/viewset/");

const routes = {
  pages: {
    home: "/",
    about: "/about/",
    contact: "/contact/",
    projects: {
      list: baseClientProjectsUrl,
      detail: clientProjectDetailUrl,
    },
    login: "/login/",
    signup: "/signup/",
  },
  api: {
    accounts: {
      viewset: baseServerAccountsUrl + "viewset/",
      authToken: baseServerAccountsUrl + "auth-token/",
    },
    projects: {
      viewset: baseServerProjectsUrl + "viewset/",
      detail: serverProjectDetailUrl,
    },
    groups: {
      viewset: groupUrlWrapper,
    },
    tasks: {},
  },
};

export default routes;
