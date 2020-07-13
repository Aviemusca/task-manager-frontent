import styled from "styled-components";

export const AuthFormContainer = styled.div`
  width: 40%;
  border-radius: 5px;
  border: solid 1px #ddd;
  margin: 5em auto;
  padding: 1.5em 3em;
  background-color: var(--form-container-color);
`;
export const AuthForm = styled.form`
  width: 100%;
  padding-bottom: 2em;
  border-bottom: solid 1px #ddd;
`;
export const AuthFormTitle = styled.h1`
  text-align: center;
  margin-bottom: 0.75em;
  padding-bottom: 0.25em;
  border-bottom: solid 1px #ddd;
`;

export const AuthFormFooter = styled.p`
  margin-top: 0.25em;
  color: #777;
`;
