import React, { Component } from "react";
import axios from "axios";
import { Card } from "semantic-ui-react";

import routes from "../routes";

class ProjectListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    const options = {
      url: routes.api.projects.viewset,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem(
          "taskManagerAuthenticationToken"
        )}`,
      },
    };
    axios(options)
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Projects</h1>
        <h1>Projects</h1>
        {this.state.projects.map((project) => (
          <h3 key={project.id}>{project.title}</h3>
        ))}
      </div>
    );
  }
}

export default ProjectListView;
