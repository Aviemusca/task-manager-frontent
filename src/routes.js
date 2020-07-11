const baseServerUrl = "http://localhost:8000/";

export default {
  pages: {
    home: "/",
    about: "/about/",
    contact: "/contact/",
    projects: "/projects/",
    login: "/login/",
    signup: "/signup/",
  },
  api: {
    accounts: {
      viewset: baseServerUrl + "accounts/viewset/",
      authToken: baseServerUrl + "accounts/auth-token/",
    },
    projects: {
      viewset: baseServerUrl + "projects/viewset/",
    },
    groups: {},
    tasks: {},
  },
};
