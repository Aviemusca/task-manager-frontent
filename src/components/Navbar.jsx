import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-steel">
        <div className="container">
          <div>
            <NavLink
              to={routes.pages.home}
              className="navbar-brand nav-link mr-4"
            >
              Home
            </NavLink>
            <NavLink
              to={routes.pages.about}
              className="navbar-brand nav-link mr-4"
            >
              About
            </NavLink>
            <NavLink
              to={routes.pages.projects}
              className="navbar-brand nav-link mr-4"
            >
              Projects
            </NavLink>
          </div>
          <div className="navbar-nav">
            <form className="form-inline">
              <NavLink to={routes.pages.login} className="nav-item nav-link">
                Log in
              </NavLink>
              <NavLink
                to={routes.pages.signup}
                className="nav-item nav-link ml-auto"
              >
                Sign up
              </NavLink>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
