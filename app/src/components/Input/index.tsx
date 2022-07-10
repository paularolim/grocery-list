import React from 'react';
import { StyledInput } from './styles';
import { InputProps } from './types';

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}
