import React from "react";
import { Container } from "semantic-ui-react";
import { StyledCard } from "./common/styles";

const AboutView = () => (
  <Container style={{ width: "60%" }}>
    <StyledCard style={{ marginTop: "6em" }}>
      <h1>Web Technologies Used</h1>
      <p>
        Taskma is a desktop web application for task management built with
        modern web technologies.
      </p>
      <p>
        The backend or server-side of the application is written in Python,
        using the{" "}
        <a target="_blank" href="https://www.djangoproject.com/">
          Django framework
        </a>
        . The backend acts as a REST API for the frontend or client-side of the
        application. This was achieved using the{" "}
        <a target="_blank" href="https://www.django-rest-framework.org/">
          Django REST framework
        </a>
        .
      </p>
      <p>
        The frontend of the application is written in JavaScript, using the{" "}
        <a target="_blank" href="https://reactjs.org/">
          React
        </a>{" "}
        library. The CSS styles are a mixture of custom styled-components and{" "}
        <a target="_blank" href="https://react.semantic-ui.com/">
          Semantic-UI React
        </a>{" "}
        components.
      </p>
    </StyledCard>
  </Container>
);
export default AboutView;
