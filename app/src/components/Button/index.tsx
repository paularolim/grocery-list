import React from "react";
import { Container, Label } from "./styles";
import { ButtonProps } from "./types";

export const Button = ({ children, ...rest }: ButtonProps) => (
  <Container {...rest}>
    <Label>{children}</Label>
  </Container>
);
