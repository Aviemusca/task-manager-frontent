import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
`;

export const CardHovered = styled.div`
  width: 100%;
  border: solid 1px #ccc;
  border-radius: 5px;
  background-color: var(--project-container-color);
  box-shadow: 8px 6px 0px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
export const CardTitle = styled.h2`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 0.5em;
  border-bottom: solid 1px #bbb;
`;

export const CardSubTitle = styled.div`
  margin: 1em 0;
`;

export const CardDescription = styled.div`
  margin: 1em 0;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 5em;
  justify-items: center;
  margin-top: 4em;
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
