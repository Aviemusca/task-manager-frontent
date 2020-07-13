import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const CardTitle = styled.h2`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 0.5em 0;
  border-bottom: solid 1px #bbb;
`;

export const CardSubTitle = styled.h4`
  text-color: #777;
`;

export const CardDescription = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 3em;
  justify-items: center;
`;

export const Header = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 1em;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const HeaderTitle = styled.h1`
  width: 33%;
`;

export const ProjectFormContainer = styled.div`
  width: 80%;
  border-radius: 5px;
  border: solid 1px #ddd;
  margin: 5em auto;
  padding: 1.5em 3em;
  background-color: var(--form-container-color);
`;

export const ProjectFormTitle = styled.h1`
  text-align: center;
  margin-bottom: 0.75em;
  padding-bottom: 0.25em;
  border-bottom: solid 1px #ddd;
`;
