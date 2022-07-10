import React from 'react';
import { Container, Label } from './styles';
import { ButtonProps } from './types';

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Label>{children}</Label>
    </Container>
  );
}
